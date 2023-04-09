package com.movie.movie.auth;

import com.movie.movie.exception.AuthorizationException;
import com.movie.movie.exception.SkipFilterException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;



public class JwtAuthenticationFilter extends OncePerRequestFilter {

    JwtConfig jwtConfig;

    JwtAuthenticationFilter (JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Claims claims = getClaims(request, response);
            if(claims.getExpiration().before(new Date())) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write("Expired token access");
                return;
            }
            String userName = getUsername(claims);
            List<String> authorities = getAuthorities(claims);
            setAuth(userName, authorities);

        } catch (SkipFilterException e) {

        } catch (AuthorizationException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("User tidak memiliki akses");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private List<String> getAuthorities(Claims claims) {
        List<String> authorities = (List<String>) claims.get("authorities");
        return authorities;
    }

    private void setAuth(String username, List<String> authorities) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                username,
                null,
                authorities.stream().map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private String getUsername(Claims claims) throws AuthorizationException {
        String userName = claims.getSubject();
        if(userName == null) {
            throw new AuthorizationException();
        }
        return userName;
    }

    private Claims getClaims(HttpServletRequest request, HttpServletResponse response) throws SkipFilterException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authorizationHeader == null || !authorizationHeader.startsWith(jwtConfig.getPrefix())) {
            throw new SkipFilterException();
        }

        String token = authorizationHeader.replace(jwtConfig.getPrefix(), "");

        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getSecret().getBytes())
                .parseClaimsJws(token)
                .getBody();

        response.addHeader(HttpHeaders.AUTHORIZATION, jwtConfig.getPrefix() + token);

        return claims;
    }
}
