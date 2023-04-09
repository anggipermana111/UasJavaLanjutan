import { InputLabel, MenuItem, Select } from "@mui/material";
import background from "../assets/images/account-bg.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Addmovie() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("1");
  const [poster, setPoster] = useState("1");
  const [rating, setRating] = useState("1");
  const [synopsis, setSynopsis] = useState("1");
  const [director, setDirector] = useState("1");
  const [duration, setDuration] = useState("1");
  const [genreIds, setGenreIds] = useState([1]);
  const [trailer, setTrailer] = useState("1");

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/genre/find-all`)
      .then((response) => response.json())
      .then((genres) => setGenres(genres));
  }, []);

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
    fetch(`http://${import.meta.env.VITE_API_HOST}/movie/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        poster,
        rating,
        synopsis,
        director,
        duration,
        genreIds,
        trailer,
      }),
    }).then(async (response) => {
      if (response.ok) {
        alert("add movie succes...");
      } else {
        alert("add movie failed...");
      }
      navigate("/movie");
    });
  };
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
        <div className="max-w-3xl bg-[#11326f]" style={divStyles}>
          <div className="mb-9">
            <h2 className="text-[38px] font-bold text-white">ADD MOVIE</h2>
          </div>
          <form action="" className="block px-3 w-full">
            <div className="flex justify-between">
              <div className="w-[45%] mb-6 flex flex-col gap-3">
                <label htmlFor="title" className="text-white text-lg text-left">
                  Title Movie
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="px-3 h-10 bg-transparent border border-blue-900 outline-none rounded"
                  type="text"
                  placeholder="Masukkan Judul"
                  required
                />
              </div>
              <div className="w-[45%] mb-6 flex flex-col gap-3">
                <label
                  htmlFor="poster"
                  className="text-white text-lg text-left"
                >
                  Poster Movie
                </label>
                <input
                  onChange={(e) => setPoster(e.target.value)}
                  id="poster"
                  className="px-3 h-10 bg-transparent border border-blue-900 outline-none rounded invalid:border-red-600"
                  type="url"
                  placeholder="Masukkan Link Gambar"
                  required
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="rating" className="text-white text-lg text-left">
                Rating Movie
              </label>
              <input
                onChange={(e) => setRating(e.target.value)}
                id="rating"
                className="px-3 h-10 bg-transparent border border-blue-900 outline-none rounded"
                type="number"
                step={0.1}
                min={0}
                max={10}
                placeholder="Masukkan Rating"
                required
              />
            </div>
            <div className="mb-6 flex flex-col gap-3">
              <label
                htmlFor="synopsis"
                className="text-white text-lg text-left"
              >
                Synopsis Movie
              </label>
              <textarea
                onChange={(e) => setSynopsis(e.target.value)}
                className="px-3 bg-transparent border border-blue-900 outline-none rounded"
                name=""
                id="synopsis"
                cols="30"
                rows="5"
                placeholder="Masukkan Synopsis"
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              <div className="w-[45%] mb-6 flex flex-col gap-3">
                <label
                  htmlFor="director"
                  className="text-white text-lg text-left"
                >
                  Director Movie
                </label>
                <input
                  onChange={(e) => setDirector(e.target.value)}
                  id="director"
                  className="px-3 h-10 bg-transparent border border-blue-900 outline-none rounded"
                  type="text"
                  placeholder="Masukkan Nama Sutradara"
                  required
                />
              </div>
              <div className="w-[45%] mb-6 flex flex-col gap-3">
                <label
                  htmlFor="duration"
                  className="text-white text-lg text-left"
                >
                  Duration Movie
                </label>
                <input
                  onChange={(e) => setDuration(e.target.value)}
                  id="duration"
                  className="px-3 h-10 bg-transparent border border-blue-900 outline-none rounded"
                  type="text"
                  placeholder="Masukkan Durasi"
                  required
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="genre" className="text-white text-lg text-left">
                Genre Movie
              </label>
              {/* [
                                ...bookedSeats,
                                `${baris}${kolom}`,
                              ] */}
              <select
                onChange={(e) =>
                  setGenreIds([...genreIds, `${e.target.value}`])
                }
                name=""
                id="genre"
                className="h-10 bg-transparent border border-blue-900 outline-none rounded"
              >
                {genres.map((genre) => {
                  return (
                    <option className="bg-blue-600" value={genre.id}>
                      {genre.genreName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <label htmlFor="trailer" className="text-white text-lg text-left">
                Trailer Movie
              </label>
              <input
                onChange={(e) => setTrailer(e.target.value)}
                id="trailer"
                className="px-3 h-10 bg-transparent border border-blue-900 outline-none rounded invalid:border-red-600"
                type="url"
                placeholder="Masukkan Link Trailer"
                required
              />
            </div>

            <div className="mb-6">
              <button
                onClick={handleClickLogin}
                type="submit"
                className="font-semibold text-white text-lg uppercase 
                bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
              >
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addmovie;
