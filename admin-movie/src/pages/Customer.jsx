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

function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_API_HOST}/customer/find-all-customer`)
      .then((response) => response.json())
      .then((customers) => setCustomers(customers));
  }, []);

  return (
    <>
      <Header></Header>
      <div className="py-[10px] w-1/2 mx-auto mt-[30px] flex justify-between border-b border-b-blue-900">
        <h1 className="text-4xl">Customer</h1>
      </div>
      <section className="max-w-[1170] w-1/2 my-[30px] mx-auto bg-[#11326f] rounded overflow-hidden border border-white">
        <TableContainer component={Paper} style={{ background: "transparent" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-[#0c1632]">
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Id Customer
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ color: "white", fontWeight: "bold" }}
                    component="th"
                    scope="row"
                  >
                    {customer.id}
                  </TableCell>
                  <TableCell style={{ color: "white", fontWeight: "bold" }}>
                    {customer.customerName}
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

export default Customer;
