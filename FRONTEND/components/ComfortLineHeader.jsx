import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; // Import Link for routing
import "./ComfortLineHeader.css"; // Import the custom CSS file for styling

export default function ComfortLineHeader({ user, onLogout }) {
  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        {/* Logo Section */}
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex align-items-center text-decoration-none"
          >
            {/* Logo image */}
            <img
              src="src/WhatsApp Image 2025-04-29 at 16.16.53_e448980f.jpg"
              alt="ComfortLine Logo"
              width="100"
              height="100"
              className="me-2"
            />
            <span className="comfortline-text">ComfortLine</span>
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link to="/book" className="nav-link px-2">
              Book
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link px-2">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link px-2">
              Contact
            </Link>
          </li>
        </ul>

        {/* Conditional Rendering for User Authentication */}
        <div className="col-md-3 d-flex justify-content-end gap-2">
          {user ? (
            <>
              <span className="hello-user">Hello, {user.name}</span>
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button">
                Login
              </Link>
              <Link to="/signup" className="sign-up-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
