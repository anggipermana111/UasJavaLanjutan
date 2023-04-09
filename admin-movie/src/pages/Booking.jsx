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

function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/booking/find-all-booking`)
      .then((response) => response.json())
      .then((bookings) => setBookings(bookings));
  }, []);

  return (
    <>
      <Header></Header>
      <div className="py-[10px] w-5/6 mx-auto mt-[30px] flex justify-between border-b border-b-blue-900">
        <h1 className="text-4xl">Booking</h1>
      </div>
      <section className="max-w-[1170] w-5/6 my-[30px] mx-auto bg-[#11326f] rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Id Booking
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Seat Number
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Movie Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Studio
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow
                  key={booking.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "white", fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {booking.id}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {booking.seat?.number}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {booking.customer?.customerName}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {booking.schedule?.movie.title}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {booking.schedule?.studio.studioName}
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

export default Booking;
