import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

import { registUser } from "../redux/actions/authActions";

import GoogleSvg from "../assets/icons8-google.svg";
import "../styles/Register.css";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token] = useState(JSON.parse(localStorage.getItem("token")) || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let username = e.target.name.value;
    // let lastname = e.target.lastname.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (name.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0) {

      if (password === confirmPassword) {
        const formData = {
          username,
          email,
          password
        };
        // try{
        // const response = await axios.post("http://localhost:3000/api/v1/register", formData);
        dispatch(registUser(formData))
          .then(() => {
            toast.success("Registration successfull");
            navigate("/login");
          })
          .catch(() => {
            toast.error("Register failed");
          });

      } else {
        toast.error("Passwords don't match");
      }

    } else {
      toast.error("Please fill all inputs");
    }
  }

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="register-main">
      <div className="register-left">
        <video controls className="rounded-md " poster="images/login/2.jpg">
          <source
            src="images/video/sample-1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="flex justify-center py-10 align-middle">
            <a href="/">
              <img src="images/logo.png" className="h-full " alt="" />
            </a>
          </div>
          <div className="register-center">
            <h2 className="font-semibold"> Sign Up </h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="User Name" name="name" required={true} />
              {/* <input type="text" placeholder="Lastname" name="lastname" required={true} /> */}
              <input type="email" placeholder="Email" name="email" required={true} />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}

              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}

              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>

          <p className="register-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
