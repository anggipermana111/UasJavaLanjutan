import background from "../assets/images/banner01.jpg";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const navigate = useNavigate();

  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://${import.meta.env.VITE_API_HOST}/schedules/${scheduleId}`)
      .then((response) => response.json())
      .then((schedule) => setSchedule(schedule));
  }, []);

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

  const handleProceed = async (event) => {
    event.preventDefault();
    let status = false;
    await Promise.all(
      bookedSeatsId.map(async (bookedSeatId) => {
        const response = await fetch(
          `http://${import.meta.env.VITE_API_HOST}/booking/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idSeat: bookedSeatId,
              idCustomer: 1,
              idSchedules: schedule.id,
            }),
          }
        );
        if (response.ok) {
          status = true;
        }
      })
    );
    if (status) {
      alert("Transaksi berhasil.");
    } else {
      alert("Transaksi gagal.");
    }
    setBookedSeats([]);
    setBookedSeatsId([]);
    navigate("/");
  };

  return (
    <>
      <Header />
      {/* section banner */}
      <section
        class="details-banner bg_img"
        style={{ backgroundImage: `url(${background})` }}
        className="bg-cover bg-center bg-no-repeat h-[350px] relative "
      >
        <div className="w-full h-full bg-[rgba(46,42,105,0.78)] absolute top-0 left-0"></div>
      </section>
      {/* section book */}
      <SectionTitle schedule={schedule} />
      {/* Checkout */}
      <div className="max-w-[800px] w-4/5 p-[30px] mx-auto mt-[150px] mb-12 border border-[#11326f] bg-[#032055]">
        <h4 className="text-center border-b border-dashed border-b-[#11326f] uppercase text-2xl pb-[30px] font-bold">
          booking summery
        </h4>
        <ul className="border-b border-dashed border-b-[#11326f] flex flex-col gap-3 px-3">
          <li className="uppercase text-left flex flex-col gap-3 py-3">
            <h6 className="text-2xl font-semibold">{schedule.movie?.title}</h6>
            <span className="text-[#9aace5] text-sm">
              {schedule.movie?.genres
                .map((genre) => genre.genreName)
                .join(", ")}
            </span>
          </li>
          <li className="uppercase text-left flex flex-col gap-3 py-3">
            <h6 className="text-2xl font-semibold flex justify-between">
              <span>Bioskop {schedule.studio?.studioName}</span>
              <span>{bookedSeats.length}</span>
            </h6>
            <div className="text-[#9aace5] text-sm flex justify-between">
              <span>
                {new Date(`${schedule.dates}T${schedule.hours}`).toLocaleString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}{" "}
                WIB
              </span>{" "}
              <span>Tickets</span>
            </div>
          </li>
          <li className="uppercase text-left flex flex-col gap-3 py-3">
            <h6 className="text-2xl font-semibold flex justify-between">
              <span>Tickets Price</span>
              <span>
                {(35000).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </h6>
          </li>
        </ul>
        <ul className="border-b border-dashed border-b-[#11326f] flex flex-col gap-5 p-3">
          <li>
            <span className="text-[#9aace5] text-sm flex justify-between">
              <span>price</span>
              <span>
                {price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </span>
            <span className="text-[#9aace5] text-sm flex justify-between">
              <span>Service Fee</span>
              <span>Rp 3000</span>
            </span>
          </li>
        </ul>
        <div className="p-3">
          <h6 className="text-2xl font-semibold flex justify-between">
            <span>Amount Payable</span>
            <span>
              {(price + 3000).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </h6>
          {/* <Link to="/"> */}
          <button
            onClick={handleProceed}
            type="button"
            className="font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
          >
            proceed
          </button>
          {/* </Link> */}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default CheckOut;
