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

function Genre() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/genre/find-all`)
      .then((response) => response.json())
      .then((genres) => setGenres(genres));
  }, []);

  return (
    <>
      <Header></Header>
      <div className="py-[10px] w-1/2 mx-auto mt-[30px] flex justify-between border-b border-b-blue-900">
        <h1 className="text-4xl">Genre</h1>
      </div>
      <section className="max-w-[1170] w-1/2 my-[30px] mx-auto bg-[#11326f] rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Id Genre
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Genre Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {genres.map((genre) => (
                <TableRow
                  key={genre.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "white", fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {genre.id}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {genre.genreName}
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

export default Genre;
