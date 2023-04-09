import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionBanner from "../components/SectionBanner";
import BookSection from "../components/BookSection";

function Movie() {
  const { movieId } = useParams();

  const [selected, setSelected] = useState();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(
      `http://${
        import.meta.env.VITE_API_HOST
      }/schedules/find-studio-by-movie-id=${movieId}`
    )
      .then((response) => response.json())
      .then((schedules) => setSchedules(schedules));
  }, []);

  return (
    <>
      <Header />
      {/* section banner */}
      <SectionBanner />
      {/* Book section */}
      <BookSection selected={selected} />
      {/* section bioskop */}
      <section className="w-5/6 m-auto">
        <h2 className="text-4xl font-bold text-left mb-7">Pilih studio</h2>
        {/* looping daftar studio */}
        {["CGV", "XXI", "Cinema"].map((studio, i) => (
          <div key={studio.id} className="mb-10">
            <h3 className="py-[15px] text-xl font-bold border border-[#17305f] border-x-0 mb-2">
              Bioskop {studio}
            </h3>
            <div className="flex flex-wrap justify-start gap-3">
              {schedules
                .filter((schedule) => schedule.studio.id === i + 1)
                .map((schedule) => (
                  <button
                    key={schedule.id}
                    onClick={() => setSelected(schedule)}
                    className={`py-2 px-5 border border-[#17305f] rounded hover:bg-green-400 cursor-pointer ${
                      schedule === selected && "bg-pink-500"
                    }`}
                  >
                    {new Date(
                      `${schedule.dates}T${schedule.hours}`
                    ).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    WIB
                  </button>
                ))}
            </div>
          </div>
        ))}
      </section>

      {/* footer */}
      <Footer />
    </>
  );
}

export default Movie;
