import React from 'react';
import "../style/Footer.css"
import logo from "../images/logo2.svg"

const Footer = () => {
  return (
    <footer id="deraj-ab">
      {/* First Section */}
      <div className="footer-innerdiv1">
        <div className="col1">
          <ul className="footer-ul">
            <li className="footer-li" style={{ fontWeight: 700 }}>QuikLearn for Business</li>
            <li className="footer-li" style={{ fontWeight: 700 }}>Become an Instructor</li>
            <li className="footer-li">Mobile Apps</li>
          </ul>
        </div>
        <div className="col2">
          <ul className="footer-ul">
            <li className="footer-li">About Us</li>
            <li className="footer-li">Careers</li>
            <li className="footer-li">Blog</li>
          </ul>
        </div>
        <div className="col3">
          <ul className="footer-ul">
            <li className="footer-li">Topics</li>
            <li className="footer-li">Support</li>
            <li className="footer-li">Affiliate</li>
          </ul>
        </div>
        <div className="col4">
          <ul className="footer-ul" style={{ margin: 0 }}>
            <li className="footer-li">
              <a href="/contact">
                <button className="English-btn">
                  <span style={{ marginLeft: 10, marginRight: 15, padding: 5 }}>
                    <i className="fas fa-globe-asia" style={{ marginRight: 10 }}></i>Contact Us
                  </span>
                  <i className="fas fa-angle-up"></i>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Second Section */}
      <div className="footer-innerdiv2">
        {/* Left Content */}
        <div className="left-contlist">
          <a href="/">
            <img src={logo} alt="QuikLearn" width="110px" />
          </a>
          <span className="copyright-span" style={{ marginLeft: 20, color: '#686f7a' }}>
            Copyright © 2024 QuikLearn, Inc.
          </span>
        </div>

        {/* Right Content */}
        <div className="right-contlist">
          <ul className="ullist-right">
            <li className="r-li-itm">Terms</li>
            <li className="r-li-itm">Privacy Policy and Cookie Policy</li>
            <li className="r-li-itm">Intellectual Property</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
