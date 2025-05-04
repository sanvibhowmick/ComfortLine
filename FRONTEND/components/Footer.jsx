import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer-container">
      <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        
        {/* Copyright */}
        <p className="col-md-4 mb-0 footer-text">
          <strong>© 2025 Comfortline, Inc</strong>
        </p>

        {/* Logo in center */}
        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-decoration-none"
          onClick={scrollToTop}
        >
          <img
            className="bi me-2"
            width="50"
            height="50"
            src="..\dist\assets\WhatsApp Image 2025-04-29 at 16.16.53_e448980f.jpg"
            alt="Comfortline Logo"
          />
        </Link>

        {/* Navigation links */}
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 footer-link" onClick={scrollToTop}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/book" className="nav-link px-2 footer-link" onClick={scrollToTop}>
              Book
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 footer-link" onClick={scrollToTop}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link px-2 footer-link" onClick={scrollToTop}>
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
