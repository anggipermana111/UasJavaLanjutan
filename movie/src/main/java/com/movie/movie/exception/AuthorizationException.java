package com.movie.movie.exception;

public class AuthorizationException extends Exception {

    public AuthorizationException () {

    }

    public  AuthorizationException (String massage) {
        super(massage);
    }
}
