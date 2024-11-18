import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import logo from "../images/logo2.svg";

const Header = ({ user }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="QuikLearn Logo" id="logo" />
          </Link>
        </div>
        <i className="fas fa-bars" id="ham-menu"></i>
        <ul id="nav-bar" className="navbar-links">
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
          {user ? (
            <>
              <li>
                <Link to="/dashboard">{user.name}</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
