import React, { useState } from "react";
import "./SignUp.css"; // Make sure this path is correct

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
    } else {
      console.log("Signed up with:", name, email, password);
      // Implement your manual sign-up logic here
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Manual Sign-Up Form */}
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {/* Google OAuth Sign-Up Button */}
        <div className="google-signup">
          <a href="http://localhost:3000/auth/google" className="google-signup-btn">
            Sign Up with Google
          </a>
        </div>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
