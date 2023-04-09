import background from "../assets/images/account-bg.jpg";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateSchedule() {
  const { scheduleId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/movie/find-all-movie`)
      .then((response) => response.json())
      .then((movies) => setMovies(movies));
  }, []);

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/schedules/${scheduleId}`)
      .then((response) => response.json())
      .then((schedule) => setSchedule(schedule));
  }, []);

  const [studios, setStudios] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/studio/find-all-studio`)
      .then((response) => response.json())
      .then((studios) => setStudios(studios));
  }, []);

  const divStyles = {
    width: "100%",
    padding: "60px 45px",
    margin: "0 auto",
    boxShadow: "0px 0px 29.4px 0.6px rgba(0, 0, 0, 0.5)",
  };

  const span = {
    color: "#31d7a9",
  };

  const handleClickLogin = () => {};

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div
      className="w-full m-0 p-0 bg-cover bg-slate-400"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="py-32 w-4/5 m-auto">
        <div className="max-w-xl bg-[#11326f]" style={divStyles}>
          <div className="mb-9">
            <h2 className="text-[38px] font-bold text-white">
              UPDATE SCHEDULE
            </h2>
          </div>
          <form action="" className="block px-3">
            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="movie" className="text-white text-lg text-left">
                Select Movies
              </label>
              <select
                name=""
                id="movie"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              >
                {movies.map((movie) => {
                  return (
                    <option
                      selected={movie.id === schedule.movie?.id && "selected"}
                      className="bg-blue-600"
                      value={movie.id}
                    >
                      {movie.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="studio" className="text-white text-lg text-left">
                Select Studio
              </label>
              <select
                name=""
                id="studio"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              >
                {studios.map((studio) => {
                  return (
                    <option
                      selected={studio.id === schedule.studio?.id && "selected"}
                      className="bg-blue-600"
                      value={studio.id}
                    >
                      {studio.studioName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="dates" className="text-white text-lg text-left">
                Select Date & Hours
              </label>
              <input
                type="datetime-local"
                id="dates"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              />
            </div>

            <div className="mb-6">
              <button
                onClick={handleClickLogin}
                type="submit"
                className="font-semibold text-white text-lg uppercase 
                bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
              >
                Update Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSchedule;
