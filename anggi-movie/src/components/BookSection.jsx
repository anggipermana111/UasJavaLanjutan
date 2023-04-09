import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BookSection({ selected }) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://${import.meta.env.VITE_API_HOST}/movie/${movieId}`)
      .then((response) => response.json())
      .then((movie) => setMovie(movie));
  }, []);

  return (
    <>
      <section className="py-[47px] px-0 border border-[#17305f] bg-[#032055] mb-9">
        <div className="max-w-[960px] w-full px-[15px] mx-auto">
          <div
            className="flex items-center justify-between"
            style={{ marginLeft: "25%" }}
          >
            <div>
              <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                  <h5 className="text-2xl font-bold">{movie.rating}</h5>
                  <div className="flex gap-1">
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-heart"></i>
                  </div>
                </div>
                <p className="italic">Users Rating</p>
              </div>
            </div>
            <Link
              to={`/seat/${selected?.id}`}
              className={!selected && "pointer-events-none"}
            >
              <button
                type="button"
                className={`font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[50px] w-auto px-[30px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300 ${
                  !selected && "bg-gray-500 bg-none"
                }`}
              >
                Book Tickets
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookSection;
