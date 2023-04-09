import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CheckoutBanner() {
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
    </section>
  );
}

export default CheckoutBanner;
