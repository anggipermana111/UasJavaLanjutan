import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SectionTitle({schedule}) {

  return (
    <>
      <section className="py-[40px] bg-[#032055] border border-[#17305f]">
        <div className="max-w-[1170px] w-full px-[15px] py-0 m-auto">
          <div className="flex items-center justify-between">
            <Link to={`/movie/${schedule.movie?.id}`}>
              <button
                type="button"
                className="font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[40px] w-auto pr-[30px] pl-[25px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
              >
                {"<< "}Back
              </button>
            </Link>
            <span className="text-center font-bold text-2xl uppercase">
              Bioskop {schedule.studio?.studioName}
            </span>
            <span className="text-center font-bold">{new Date(
                      `${schedule.dates}T${schedule.hours}`
                    ).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })} WIB</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default SectionTitle;
