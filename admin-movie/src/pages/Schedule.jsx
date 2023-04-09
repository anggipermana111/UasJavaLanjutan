import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Schedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/schedules/find-all-schedule`)
      .then((response) => response.json())
      .then((schedules) => setSchedules(schedules));
  }, []);

  return (
    <>
      <Header></Header>
      <div className="py-[10px] w-5/6 mx-auto mt-[30px] flex justify-between border-b border-b-blue-900">
        <h1 className="text-4xl">Schedule</h1>
        <Link to="/addschedule">
          <button
            type="button"
            className="font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[50px] w-auto px-[30px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
          >
            Add Schedule +
          </button>
        </Link>
      </div>
      <section className="max-w-[1170] w-5/6 my-[30px] mx-auto bg-[#11326f] rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Id Schedule
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Movie Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Studio Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Dates
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Hours
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow
                  key={schedule.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "white", fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {schedule.id}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {schedule.movie?.title}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {schedule.studio?.studioName}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {schedule.dates}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {schedule.hours}
                  </TableCell>
                  <TableCell
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <Link>
                        <button
                          type="button"
                          className="font-semibold text-white text-sm uppercase 
                rounded-[30px] h-[25px] w-auto px-[30px] bg-green-500 hover:bg-green-600"
                        >
                          Update
                        </button>
                      </Link>
                      <Link>
                        <button
                          type="button"
                          className="font-semibold text-white text-sm uppercase 
                rounded-[30px] h-[25px] w-auto px-[30px] bg-pink-500 hover:bg-pink-600"
                        >
                          Delete
                        </button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <Footer></Footer>
    </>
  );
}

export default Schedule;
