import { Link } from "react-router-dom";
import layar from "../assets/images/screen-thumb.png";
import proceed from "../assets/images/movie-bg-proceed.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

function Seat() {
  const { scheduleId } = useParams();

  const [selected, setSelected] = useState(undefined);
  const [schedule, setSchedule] = useState({});
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://${import.meta.env.VITE_API_HOST}/schedules/${scheduleId}`)
      .then((response) => response.json())
      .then((schedule) => setSchedule(schedule));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `http://${
        import.meta.env.VITE_API_HOST
      }/seat/find-seat-booked=${scheduleId}`
    )
      .then((response) => response.json())
      .then((seats) => setSeats(seats));
  }, []);

  // const [bookedSeats, setBookedSeats] = useState([]);
  const {
    bookedSeats,
    setBookedSeats,
    bookedSeatsId,
    setBookedSeatsId,
    price,
    hasLogin,
    setHasLogin,
    tampId,
    setTampId,
  } = useContext(UserContext);

  return (
    <>
      <Header />

      {/* section banner */}
      <section
        className="pt-[212px] pb-[112px] relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${schedule.movie?.poster})` }}
      >
        <div className="w-full h-full bg-[rgba(46,42,105,0.78)] absolute top-0 left-0"></div>
        <div className="max-w-[1170px] w-full px-[15px] mx-auto">
          <div className="relative z-10">
            <div className="text-center">
              <h3 className="capitalize text-[40px] mb-2 leading-tight font-bold">
                {schedule.movie?.title}
              </h3>
              <div className="text-center italic">
                {schedule.movie?.genres
                  .map((genre) => genre.genreName)
                  .join(", ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section title */}
      <SectionTitle schedule={schedule} />

      {/* Section Movie */}
      <section className="py-[120px]">
        <div className="max-w-[1170px] w-full px-[15px] mx-auto">
          <div className=" mb-16">
            <h4 className="uppercase border border-[#17305f] border-x-0 text-4xl font-bold w-1/4 py-3 m-auto mb-12">
              Screen
            </h4>
            <div className="flex justify-center mb-16">
              <img src={layar} alt="" />
            </div>
            <h4 className="uppercase border border-[#17305f] border-x-0 text-3xl text-green-400 font-semibold w-1/4 py-3 m-auto mb-12 flex flex-col gap-1">
              <span className="block">Seat</span>
              <span className="text-xs text-white">
                {"("}35k / seat{")"}
              </span>
            </h4>
            {/* Looping API */}
            <div className="flex flex-col gap-6">
              {["A", "B", "C", "D", "E"].map((baris, i) => (
                <div className="flex justify-between w-4/6 m-auto gap-10">
                  <div className="flex justify-around w-2/5">
                    {[1, 2, 3, 4, 5].map((kolom) => (
                      <button
                        onClick={() => {
                          if (!bookedSeats.includes(`${baris}${kolom}`)) {
                            if (bookedSeats.length < 3) {
                              setBookedSeats([
                                ...bookedSeats,
                                `${baris}${kolom}`,
                              ]);
                              setBookedSeatsId([
                                ...bookedSeatsId,
                                `${i * 10 + kolom}`,
                              ]);
                              setSelected(schedule);
                            } else {
                              alert("Maksimal Pemesanan 3 Kursi!");
                            }
                          } else {
                            if (bookedSeats.length < 2) {
                              setSelected(undefined);
                            }
                            setBookedSeats(
                              bookedSeats.filter(
                                (bookedSeat) =>
                                  bookedSeat !== `${baris}${kolom}`
                              )
                            );
                            setBookedSeatsId(
                              bookedSeatsId.filter(
                                (bookedSeatId) =>
                                  bookedSeatId != `${i * 10 + kolom}`
                              )
                            );
                          }
                        }}
                        className={`w-[50px] h-[50px] rounded border font-bold flex justify-center items-center ${
                          seats.find((seat) => seat.number == baris + kolom) &&
                          "pointer-events-none bg-slate-600"
                        } ${
                          bookedSeats.includes(`${baris}${kolom}`) &&
                          "bg-pink-600 hover:bg-pink-700"
                        } hover:bg-green-400`}
                      >
                        <span>
                          {baris}
                          {kolom}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-around w-2/5">
                    {[6, 7, 8, 9, 10].map((kolom) => (
                      <button
                        onClick={() => {
                          if (!bookedSeats.includes(`${baris}${kolom}`)) {
                            if (bookedSeats.length < 3) {
                              setBookedSeats([
                                ...bookedSeats,
                                `${baris}${kolom}`,
                              ]);
                              setBookedSeatsId([
                                ...bookedSeatsId,
                                `${i * 10 + kolom}`,
                              ]);
                              setSelected(schedule);
                            } else {
                              alert("Maksimal Pemesanan 3 Kursi!");
                            }
                          } else {
                            if (bookedSeats.length < 2) {
                              setSelected(undefined);
                            }
                            setBookedSeats(
                              bookedSeats.filter(
                                (bookedSeat) =>
                                  bookedSeat !== `${baris}${kolom}`
                              )
                            );
                            setBookedSeatsId(
                              bookedSeatsId.filter(
                                (bookedSeatId) =>
                                  bookedSeatId != `${i * 10 + kolom}`
                              )
                            );
                          }
                        }}
                        className={`w-[50px] h-[50px] rounded border font-bold flex justify-center items-center ${
                          seats.find((seat) => seat.number == baris + kolom) &&
                          "pointer-events-none bg-slate-600"
                        } ${
                          bookedSeats.includes(`${baris}${kolom}`) &&
                          "bg-pink-600 hover:bg-pink-700"
                        } hover:bg-green-400`}
                      >
                        <span>
                          {baris}
                          {kolom}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* End Looping API */}
          </div>

          <div className="flex justify-center gap-3 mb-14 items-center">
            <span className="w-[50px] h-[50px] rounded border  font-bold flex justify-center items-center">
              EX
            </span>
            <p className="uppercase">: ready</p>
            <span className="w-[50px] h-[50px] rounded border  font-bold flex justify-center items-center bg-slate-600">
              EX
            </span>
            <p className="uppercase">: booked</p>
            <span className="w-[50px] h-[50px] rounded border  font-bold flex justify-center items-center bg-pink-600">
              EX
            </span>
            <p className="uppercase">: choosed</p>
          </div>

          <div
            className="py-[32px] px-[40px] relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${proceed})` }}
          >
            <div className="w-full h-full bg-[rgba(5,0,104,0.8)] absolute top-0 left-0"></div>
            <div className="flex justify-between items-center relative z-10">
              <div className="flex flex-col gap-1">
                <span className="capitalize font-semibold">
                  You have Choosed Seat
                </span>
                <h3 className="text-green-400 text-4xl font-bold uppercase text-left">
                  {bookedSeats.join(", ")}
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                <span className="capitalize font-semibold">total price</span>
                <h3 className="text-green-400 text-4xl font-bold">
                  {price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h3>
              </div>
              <Link
                to={!hasLogin ? "/login" : `/checkout/${selected?.id}`}
                className={!selected && "pointer-events-none"}
              >
                {setTampId(selected?.id)}
                <button
                  type="button"
                  className={`font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[40px] w-auto px-[30px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300 ${
                  !selected && "bg-gray-500 bg-none"
                }`}
                >
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}

export default Seat;
