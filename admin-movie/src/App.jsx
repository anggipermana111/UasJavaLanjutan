import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Schedule";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login></Login>
    </>
  );
}

export default App;
