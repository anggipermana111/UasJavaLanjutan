import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import video from "../assets/images/video-button.png";

function SectionBanner() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://${import.meta.env.VITE_API_HOST}/movie/${movieId}`)
      .then((response) => response.json())
      .then((movie) => setMovie(movie));
  }, []);
  return (
    <section
      style={{ backgroundImage: `url(${movie.poster})` }}
      className="bg-cover bg-center bg-no-repeat pt-[235px] pb-[20px] relative "
    >
      <div className="w-full h-full bg-[rgba(46,42,105,0.78)] absolute top-0 left-0"></div>
      <div className="max-w-[1170px] w-full px-[15px] mx-auto">
        <div className="relative z-10">
          <div className="w-[calc(25%-28px)] block absolute top-0 left-0 border border-[#17305f] overflow-hidden rounded-[5px]">
            <img
              src={movie.poster}
              alt="movie"
              className="w-full overflow-clip"
            />
            <a
              href={`https://www.youtube.com/embed/${movie.trailer}`}
              className="w-[81px] h-[81px] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <img
                src={video}
                alt="movie"
                className="w-full align-middle overflow-clip"
              />
            </a>
          </div>
          <div style={{ marginLeft: "25%" }}>
            <h3 className="text-4xl font-bold text-left mb-2">{movie.title}</h3>
            <div className="mb-[21px] text-left italic">
              <p>{movie.synopsis}</p>
              <br />
              <span>
                {movie.genres?.map((genre) => genre.genreName).join(", ")}
              </span>
            </div>
            <div className="flex gap-3 flex-col items-start">
              <div class="item" className="text-sm text-[#9aace5] my-[5px]">
                <i class="fas fa-calendar-alt" style={{ margin: "5px" }}></i>
                <span>06 Dec, 2020</span>
              </div>
              <div class="item" className="text-sm text-[#9aace5] my-[5px]">
                <i class="far fa-clock" style={{ margin: "5px" }}></i>
                <span>{movie.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionBanner;
