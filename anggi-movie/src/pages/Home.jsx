import background from "../assets/images/banner01.jpg";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `http://${import.meta.env.VITE_API_HOST}/movie/find-movie-by-schedule`
    )
      .then((response) => response.json())
      .then((movies) => setMovies(movies));
  }, []);

  return (
    <>
      <Header />

      {/* section banner */}
      <section className="pt-[250px] px-0 pb-[316px] relative">
        <div
          className="absolute top-0 left-0 bottom-0 right-0 opacity-30 bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="w-full px-[15px] mx-auto">
          <div className="relative z-10 my-0 mx-auto text-center max-w-[840px]">
            <h1 className="text-[80px] leading-[1.1] uppercase mb-[18px] font-[800]">
              <span className="py-1 px-0 block">
                book <span className="text-green-400">now</span>
              </span>{" "}
              <span className="py-1 px-0 block">
                watch <span className="text-pink-400">later</span>
              </span>
            </h1>
            <p>
              Safe, secure, reliable ticketing.Your ticket to live
              entertainment!
            </p>
          </div>
        </div>
      </section>

      {/* section movie */}
      <section className="py-[120px]">
        <div className="max-w-[1170px] w-full px-[15px] mx-auto">
          <div>
            <div className="flex justify-between items-center mb-[60px]">
              <div className="flex flex-col items-start">
                <h2 className="uppercase mb-[19px] text-[50px] leading-[60px] -mt-[13px] font-bold">
                  movies
                </h2>
                <p className="-mb-[8px] -mt-[11px]">
                  Be sure not to miss these Movies today.
                </p>
              </div>
            </div>
            {/* tab area movie */}
            <div className="flex flex-wrap overflow-hidden justify-around gap-6">
              {/* looping movie */}
              {movies.map((movie) => {
                return (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="w-[250px] bg-[#032055] cursor-pointer rounded-md overflow-hidden"
                  >
                    <img src={movie.poster} alt="" />
                    <h2 className="text-xl p-2 font-bold border-b border-b-[#11326f] py-3">
                      {movie.title}
                    </h2>
                    <div className="py-4 px-2">
                      {movie.genres.map((genre) => genre.genreName).join(", ")}
                    </div>
                  </Link>
                );
              })}

              {/* end looping */}
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}

export default Home;
