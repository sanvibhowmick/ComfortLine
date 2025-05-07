import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/ComfortLineHeader";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignUp";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import BookingPage from "../components/Book";
import CheckoutPage from "../components/Checkout";
import Chatbot from "../components/ChatBot";

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    const photo = queryParams.get("photo");

    if (name && email && photo) {
      const userData = { name, email, photo };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      window.history.replaceState({}, document.title, "/"); // Clean URL
      navigate("/"); // Redirect to home after login
    } else {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [location.search, navigate]);

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { credentials: "include" })
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <div className="bg-light min-vh-100">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <h1>Hello, {user.name} 👋</h1>
                </div>
              )}
              <Hero />
              <FeaturesSection />
              <Testimonial />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}