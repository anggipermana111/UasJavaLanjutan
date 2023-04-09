import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

function Header() {
  const {
    bookedSeats,
    setBookedSeats,
    bookedSeatsId,
    setBookedSeatsId,
    price,
    hasLogin,
    setHasLogin,
  } = useContext(UserContext);

  return (
    <header className="border-b border-b-slate-600 py-5 fixed w-full top-0 left-0 z-50 bg-[#0a1e5e]">
      <div className="w-full px-4 mx-auto max-w-[1170px]">
        <div className="flex justify-between items-center">
          <Link to="/" className="w-[170px] flex items-center gap-2">
            <img src={logo} alt="logo" />{" "}
            <span className="text-white text-3xl font-bold">
              Tiket<span className="text-red-600">Go</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-5">
            <ul className="flex flex-wrap justify-end items-center m-0 p-0">
              <li className="px-6 py-[5px] relative list-none">
                <Link
                  to="/"
                  className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                >
                  Home
                </Link>
              </li>
              <li className="px-6 py-[5px] relative list-none">
                <a
                  href=""
                  className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                >
                  Profiles
                </a>
              </li>
              <ul className="flex justify-center gap-6 mx-6">
                <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9]">
                  <a href="#0" className="active">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9]">
                  <a href="#0" className="">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9]">
                  <a href="#0">
                    <i className="fab fa-google"></i>
                  </a>
                </li>
              </ul>
            </ul>

            {hasLogin ? (
              <>
                <div className="text-transparent font-black bg-gradient-to-r from-[#ff0000] via-[#ae00ff] to-[#0515ff] bg-clip-text text-2xl uppercase flex justify-center items-center ">
                  <span>Hai Users!</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button
                    type="button"
                    className="font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
                  >
                    Join Us
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
