import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

import { loginUser } from '../redux/actions/authActions';

import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("token")) || "");
  const [btnDisable, setBtnDisable] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let user = e.target.user.value;
    let password = e.target.password.value;

    if (user.length > 0 && password.length > 0) {
      const formData = {
        user,
        password,
      };
      setBtnDisable(true);

      dispatch(loginUser(formData))
        .then(() => {
          toast.success("Login successfull");
          setBtnDisable(false);
          navigate("/airesearch");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setBtnDisable(false)
        });

    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if(token !== ""){
      toast.success("You already logged in");
      navigate("/airesearch");
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left">
      <video controls className="rounded-md " poster="images/login/1.jpg">
        <source
          src="images/video/sample-1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="flex justify-center pt-10 align-middle">
            <a href="/">
              <img src="images/logo.png" className="h-full " alt="" />
            </a>
          </div>
          <div className="login-center">
            <h2 className="font-semibold">Log In!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="text" placeholder="User Name" name="user" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button disabled={btnDisable} type="submit">Log In</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
