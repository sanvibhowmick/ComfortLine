import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
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
import DashboardPage from "../components/Dashboard";

// Protected Route Component
const ProtectedRoute = ({ element, user }) => {
  return user ? element : <Navigate to="/login" replace />;
};

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Check for authentication on component mount
    const checkAuthentication = async () => {
      setLoading(true);
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          if (location.pathname === "/dashboard") {
            await fetchDashboardData();
          }
          setLoading(false);
          return;
        }

        // Try to fetch from API session
        try {
          const response = await fetch("http://localhost:3000/check-auth", {
            credentials: "include",
            headers: { Accept: "application/json" },
          });

          if (response.ok) {
            const userData = await response.json();
            if (userData.authenticated && userData.user) {
              localStorage.setItem("user", JSON.stringify(userData.user));
              setUser(userData.user);
              if (location.pathname === "/dashboard") {
                await fetchDashboardData();
              }
            }
          }
        } catch (apiError) {
          console.log("API auth check failed", apiError);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [location.pathname]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard-data", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error("Failed to fetch dashboard data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");
    const name = queryParams.get("name");
    const email = queryParams.get("email");
    const photo = queryParams.get("photo");
    const loyaltyPoints = queryParams.get("loyaltyPoints") || 450;
    const upcomingTrips = queryParams.get("upcomingTrips") || 2;
    const pastTrips = queryParams.get("pastTrips") || 7;
    const memberSince = queryParams.get("memberSince") || new Date().toISOString();

    if (name && email) {
      const userData = {
        id: userId,
        name,
        email,
        photo: photo || null,
        memberSince,
        loyaltyPoints: parseInt(loyaltyPoints),
        upcomingTrips: parseInt(upcomingTrips),
        pastTrips: parseInt(pastTrips),
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      window.history.replaceState({}, document.title, location.pathname);

      // Delay navigation to allow React state to update
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    }
  }, [location.search, location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      // Call the backend to handle the logout
      await fetch("http://localhost:3000/logout", {
        method: "GET", // Use GET for logout
        credentials: "include", // Ensure the session cookie is cleared
      }).catch(err => console.log("Logout API call failed", err));
    } finally {
      // Clear user data from localStorage and React state
      localStorage.removeItem("user");
      setUser(null);
      setDashboardData(null);

      // Redirect the user to the home page
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturesSection />
              <Testimonial />
            </>
          }
        />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<DashboardPage user={user} dashboardData={dashboardData} />}
              user={user}
            />
          }
        />
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
