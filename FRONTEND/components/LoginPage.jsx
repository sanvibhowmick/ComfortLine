import React, { useState } from "react";
import "./LoginPage.css"; // Ensure this path is correct

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
    } else {
      console.log("Logged in with:", email, password);
      // Optional: POST to your backend for manual login
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self"); // Redirect to your backend Google OAuth route
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Manual Login Form */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        {/* Google OAuth Button */}
        <div className="google-login">
          <button onClick={handleGoogleLogin} className="google-login-btn">
            Sign in with Google
          </button>
        </div>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
