import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./Header.css"; // Assuming you have the same CSS file

const Header = ({isAuth}) => {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <Link to="/">
            <img src="images/logo2.svg" alt="QuikLearn Logo" id="logo" />
          </Link>
        </div>
        <i className="fas fa-bars" id="ham-menu"></i>
        <ul id="nav-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/teachers">Teachers</Link>
          </li>
          <li>
            <Link to="/faqs">FAQ</Link>
          </li>
          {isAuth?
            <Link to={"/account"}>Account</Link> :
              <Link to={"/login"}>Login </Link>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
