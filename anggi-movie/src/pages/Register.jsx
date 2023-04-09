import TextField from "@mui/material/TextField";
import background from "../assets/images/account-bg.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const divStyles = {
    width: "100%",
    padding: "60px 45px",
    margin: "0 auto",
    background: "rgba(68, 90, 153, 0.051)",
    boxShadow: "0px 0px 29.4px 0.6px rgba(0, 0, 0, 0.5)",
  };

  const span = {
    color: "#31d7a9",
  };

  const handleClickLogin = (event) => {
    event.preventDefault();
    fetch(`http://${import.meta.env.VITE_API_HOST}/customer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName,
        username,
        password,
      }),
    }).then(async (response) => {
      if (response.ok) {
        alert("registration succes...");
        navigate("/login");
      } else {
        alert("registration failed...");
      }
    });
  };

  return (
    <div
      className="w-full m-0 p-0 bg-cover bg-slate-400"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="py-32 w-4/5 m-auto">
        <div className="max-w-xl" style={divStyles}>
          <div className="mb-9">
            <span className="uppercase block text-2xl mb-6 -mt-1" style={span}>
              WELCOME
            </span>
            <h2 className="text-[38px] font-bold text-white">To TiketGo</h2>
          </div>
          <form action="" className="block px-3">
            <div className="mb-6 flex flex-col gap-3">
              <label
                for="nama"
                className="cursor-pointer uppercase text-slate-300 text-left"
              >
                NAMA<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                onChange={(e) => setCustomerName(e.target.value)}
                type="text"
                placeholder="Your Name"
                id="nama"
                required
                className="border-slate-500 placeholder:text-[#5e668a] inline-block tracking-normal text-start cursor-text bg-transparent border-b-[#23334f] border-b-[1px] py-1 focus:border-b-[1px] focus:border-red-600 outline-none"
              />
            </div>
            <div className="mb-6 flex flex-col gap-3">
              <label
                for="email"
                className="cursor-pointer uppercase text-slate-300 text-left"
              >
                Username<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Your Username"
                id="text"
                required
                className="border-slate-500 placeholder:text-[#5e668a] inline-block tracking-normal text-start cursor-text bg-transparent border-b-[#23334f] border-b-[1px] py-1 focus:border-b-[1px] focus:border-red-600 outline-none"
              />
            </div>
            <div className="mb-6 flex flex-col gap-3">
              <label
                for="password"
                className="cursor-pointer uppercase text-slate-300 text-left"
              >
                Password<span className="text-red-500 text-lg">*</span>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
                id="password"
                required
                className="border-slate-500 placeholder:text-[#5e668a] inline-block tracking-normal text-start cursor-text bg-transparent border-b-[#23334f] border-b-[1px] py-1 focus:border-b-[1px] focus:border-red-600 outline-none"
              />
            </div>
            <div className="flex justify-start mb-6">
              <div className="flex gap-2">
                <input type="checkbox" id="privacy" required checked />
                <label for="privacy" className="text-sm text-[#6D7BBA]">
                  I agree to the
                  <span style={span}> Terms, Privacy Policy</span> and{" "}
                  <span style={span}>Fees</span>
                </label>
              </div>
            </div>
            {/* box-shadow: 0px 10px 15px 0px rgba(59, 55, 188, 0.5); */}
            <div className="mb-6">
              <button
                onClick={handleClickLogin}
                type="submit"
                className="font-semibold text-white text-lg uppercase 
                bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          {/* option */}
          <div className="text-center mb-7 font-normal">
            Already have an account?{" "}
            <Link to="/login" className="text-[#31d7a9]">
              Login
            </Link>
          </div>
          {/* or */}

          <div className="uppercase flex items-center justify-between mb-7">
            <span className="bg-[#bdbdbd] opacity-50 h-[2px] w-[40%] top-[10px] inline-block"></span>
            <span>Or</span>
            <span className="bg-[#bdbdbd] opacity-50 h-[2px] w-[40%] top-[10px] inline-block"></span>
          </div>
          {/* social */}
          <ul className="flex justify-center gap-6">
            <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9]">
              <a href="#0" class="active">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9]">
              <a href="#0" class="">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9]">
              <a href="#0">
                <i class="fab fa-google"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;
