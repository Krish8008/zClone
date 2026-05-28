import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post(
        "http://localhost:3002/login",
        {
          ...inputValue,
        },
        {
          withCredentials: true,
        }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = "http://localhost:3001";
        }, 1000);

      } else {
        handleError(message);
      }

    } catch (error) {
      console.log(error);
    }

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <div className="form_box">
        <h2>Login to Zerodha</h2>

        <p className="subtitle">
          Welcome back, continue your trading journey
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input_group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="input_group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              required
            />
          </div>

          <button type="submit" className="submit_btn">
            Login
          </button>

          <span className="bottom_text">
            Don't have an account?
            <Link to="/signup"> Signup</Link>
          </span>

        </form>

      </div>

      <ToastContainer />

    </div>
  );
};

export default Login;