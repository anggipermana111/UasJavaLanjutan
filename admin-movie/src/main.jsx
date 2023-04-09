import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Movie from "./pages/Movie";
import Studio from "./pages/Studio";
import Genre from "./pages/Genre";
import Customer from "./pages/Customer";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import AddSchedule from "./pages/AddSchedule";
import Addmovie from "./pages/AddMovie";
import UpdateSchedule from "./pages/UpdateSchedule";
import Schedule from "./pages/Schedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/schedule",
    element: <Schedule />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
  {
    path: "/studio",
    element: <Studio />,
  },
  {
    path: "/genre",
    element: <Genre />,
  },
  {
    path: "/customer",
    element: <Customer />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addschedule",
    element: <AddSchedule />,
  },
  {
    path: "/addmovie",
    element: <Addmovie />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
