import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


import { Navbar } from './navbar';
import './login.css';

export const Login = () => {
  const [loginType, setLoginType] = useState("user"); // Default to 'user'
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  localStorage.setItem("username", username);

  }, [username]);
  // Function to handle login
  const handleLogin = async () => {
    try {
      // Make a POST request to the backend with login credentials
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
        role: loginType, // Pass role (user/admin/trainer)
      });
      if (response.data.username) {
        localStorage.setItem("username", response.data.username);
      }
  
      
      // Handle success
      console.log(response.data); // Display response message
      alert(response.data.message); // Response from backend

      // Role-based navigation based on the response
      if (response.data.role === "admin") {
        navigate("/admin_dashboard");
      } else if (response.data.role === "trainer") {
        navigate("/trainer_dashboard");
      } else {
        navigate("/login/workout_plan");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert("Invalid Credentials or Server Error");
    }
  };

  return (
    <div>
      <Navbar />
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                {/* Left Section */}
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="https://img.freepik.com/free-vector/abstract-sport-fitness-logo-logotype-template_23-2148236902.jpg?t=st=1734190008~exp=1734193608~hmac=f1e55b03bd2a4a33b8f826b5fd6a8f5a8176b99e530d0c7d95a2c1eb222cbccc&w=1060"
                        style={{ width: '185px' }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">We are The Fitness Team</h4>
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      {/* Dropdown for login type */}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="loginType">
                          Select Login Type
                        </label>
                        <select
                          id="loginType"
                          className="form-select"
                          value={loginType}
                          onChange={(e) => setLoginType(e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="trainer">Trainer</option>
                        </select>
                      </div>

                      {/* Username Input */}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>

                    {  /* Password Input */}
                                  <div className="form-outline mb-4">
                                  <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                  </div>

                               
                                        <div className="text-center pt-1 mb-3 pb-1">
                                        <button
                                        className="btn btn-primary btn-block gradient-custom-2 mb-2"
                                        type="button"
                                        onClick={handleLogin}
                                        style={{
                                        background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                                        border: 'none',
                                        color: '#fff',
                                        }}
                                        >
                                        Log in
                                        </button>
                                        </div>
                                        <div className="text-center">
                                        <a className="text-muted" href="#!">
                                        Forgot password?
                                        </a>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        style={{
                                        borderColor: '#ff4b2b',
                                        color: '#ff4b2b',
                                        }}
                                        >
                                        Create new
                                        </button>
                                        </div>
                                      </form>
                                      </div>
                                      </div>

                                      {/* Right Section */}
                <div
                  className="col-lg-6 d-flex align-items-center gradient-custom-2"
                  style={{
                    background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                  }}
                >
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};
