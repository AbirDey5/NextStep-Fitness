import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use the navigate hook for redirection

  // Fetch the username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };

  // Navigate to the login page
  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Fitness</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Profile</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login/workout_plan/workouts">Workouts</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Link
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Link</a>
            </li>
          </ul>
          {/* Display the logged-in username or a "Login" button */}
          <span className="navbar-text text-light">
            {username ? `Welcome, ${username}` : ''}
          </span>

          {/* If not logged in, display the Login button */}
          {!username && (
            <button onClick={handleLogin} className="btn btn-outline-light ms-3">
              Login
            </button>
          )}

          {/* Optional: Button for logging out */}
          {username && (
            <button onClick={handleLogout} className="btn btn-outline-light ms-3">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
