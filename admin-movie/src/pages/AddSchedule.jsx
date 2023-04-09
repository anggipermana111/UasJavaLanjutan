import { InputLabel, MenuItem, Select } from "@mui/material";
import background from "../assets/images/account-bg.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddSchedule() {
  const navigate = useNavigate();
  const [idMovie, setIdMovie] = useState(1);
  const [idStudio, setIdStudio] = useState(1);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("10:00:00");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/movie/find-all-movie`)
      .then((response) => response.json())
      .then((movies) => setMovies(movies));
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

  const handleClickLogin = (event) => {
    event.preventDefault();
    fetch(`http://${import.meta.env.VITE_API_HOST}/schedules/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idMovie: idMovie,
        idStudio: idStudio,
        dates: date,
        hours: hour,
      }),
    }).then(async (response) => {
      if (response.ok) {
        alert("add schedule succes...");
      } else {
        alert("add schedule failed...");
      }
      navigate("/schedule");
    });
  };

  return (
    <div
      className="w-full m-0 p-0 bg-cover bg-slate-400"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="py-32 w-4/5 m-auto">
        <div className="max-w-xl bg-[#11326f]" style={divStyles}>
          <div className="mb-9">
            <h2 className="text-[38px] font-bold text-white">ADD SCHEDULE</h2>
          </div>
          <form action="" className="block px-3">
            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="movie" className="text-white text-lg text-left">
                Select Movies
              </label>
              <select
                onChange={(e) => setIdMovie(e.target.value)}
                name=""
                id="movie"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              >
                {movies.map((movie) => {
                  return (
                    <option className="bg-blue-600" value={movie.id}>
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
                onChange={(e) => setIdStudio(e.target.value)}
                name=""
                id="studio"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              >
                {studios.map((studio) => {
                  return (
                    <option className="bg-blue-600" value={studio.id}>
                      {studio.studioName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="dates" className="text-white text-lg text-left">
                Select Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="dates"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              />
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="time" className="text-white text-lg text-left">
                Select Time
              </label>
              <select
                onChange={(e) => setHour(e.target.value)}
                name=""
                id="time"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              >
                <option className="bg-blue-600" value="10:00:00">
                  10:00:00
                </option>
                <option className="bg-blue-600" value="13:00:00">
                  13:00:00
                </option>
                <option className="bg-blue-600" value="16:00:00">
                  16:00:00
                </option>
                <option className="bg-blue-600" value="19:00:00">
                  19:00:00
                </option>
                <option className="bg-blue-600" value="22:00:00">
                  22:00:00
                </option>
              </select>
            </div>

            <div className="mb-6">
              <button
                onClick={handleClickLogin}
                type="submit"
                className="font-semibold text-white text-lg uppercase 
                bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
              >
                Add Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSchedule;
