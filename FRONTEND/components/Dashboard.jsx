import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import the custom CSS file

const DashboardPage = ({ user, dashboardData }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(!dashboardData);
  const [data, setData] = useState(dashboardData || null);

  useEffect(() => {
    // If dashboardData is already passed down, use it
    if (dashboardData) {
      setData(dashboardData);
      setIsLoading(false);
      return;
    }
    
    // Otherwise fetch it
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard-data", {
          credentials: "include",
          headers: {
            "Accept": "application/json"
          }
        });
        
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          console.error("Failed to fetch dashboard data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && !dashboardData) {
      fetchDashboardData();
    }
  }, [user, dashboardData]);

  // Navigation handlers
  const handleBookTrip = () => navigate("/book");
  const handleViewBookings = () => navigate("/book");
  const handleTripHistory = () => navigate("/trip-history");
  const handleLoyaltyProgram = () => navigate("/loyalty-program");
  const handleAccountSettings = () => navigate("/account-settings");
  const handleViewAllOffers = () => navigate("/show-offers");

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  // Ensure we have user data even if dashboard data failed to load
  const userData = data?.user || user;
  const trips = data?.trips || [];
  const offers = data?.offers || [];
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Member since date
  const memberSinceDate = userData?.memberSince 
    ? formatDate(userData.memberSince)
    : formatDate(userData?.createdAt || new Date());

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="md:flex items-center">
            <div className="md:w-1/4 text-center mb-4 md:mb-0">
              <div className="profile-image">
                {userData?.photo ? (
                  <img 
                    src={userData.photo} 
                    alt="Profile" 
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    {userData?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="profile-status"></div>
              </div>
            </div>
            
            <div className="profile-details md:w-3/4 md:pl-6">
              <h1>{userData?.name || "User"}</h1>
              <p className="profile-email">{userData?.email || "No email available"}</p>
              <p className="member-since">Member since: {memberSinceDate}</p>
              <button 
                onClick={handleLogout} 
                className="logout-button"
              >
                Logout
              </button>
              
              <div className="stats-container">
                <div className="stat-card loyalty-card">
                  <div className="stat-value loyalty-value">{userData?.loyaltyPoints || 0}</div>
                  <div className="stat-label">Loyalty Points</div>
                </div>
                <div className="stat-card upcoming-card">
                  <div className="stat-value upcoming-value">{userData?.upcomingTrips || 0}</div>
                  <div className="stat-label">Upcoming Trips</div>
                </div>
                <div className="stat-card past-card">
                  <div className="stat-value past-value">{userData?.pastTrips || 0}</div>
                  <div className="stat-label">Past Trips</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Upcoming Trips */}
          <div className="content-card trips-card">
            <div className="card-header">
              <h2>Upcoming Trips</h2>
              <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="card-content">
              {trips && trips.length > 0 ? (
                <div>
                  {trips.map(trip => (
                    <div key={trip.id} className="trip-item">
                      <div className="trip-destination">{trip.destination}</div>
                      <div className="trip-date">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(trip.date)}
                      </div>
                      <div className="trip-status">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={
                          trip.status === "Confirmed" ? "status-confirmed" : 
                          trip.status === "Pending" ? "status-pending" : ""
                        }>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <p>No upcoming trips. Ready to plan your next adventure?</p>
                </div>
              )}
              <button 
                className="action-button primary-button"
                onClick={handleBookTrip}
              >
                Book New Trip
              </button>
            </div>
          </div>

          {/* Special Offers */}
          <div className="content-card offers-card">
            <div className="card-header">
              <h2>Special Offers</h2>
              <svg className="card-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div className="card-content">
              {offers && offers.length > 0 ? (
                <div>
                  {offers.map(offer => (
                    <div key={offer.id} className="offer-item">
                      <div className="offer-title">{offer.title}</div>
                      <div className="offer-discount">Discount: {offer.discount}</div>
                      <div>
                        <span className="offer-code">{offer.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p>No special offers available at the moment.</p>
                </div>
              )}
              <button 
                className="action-button secondary-button"
                onClick={handleViewAllOffers}
              >
                View All Offers
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="quick-links-card">
          <div className="quick-links-header">
            <h2>Quick Links</h2>
          </div>
          <div className="links-grid">
            <div 
              className="quick-link-button bookings-link"
              onClick={handleViewBookings}
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Trip History</span>
            </div>
            <div 
              className="quick-link-button loyalty-link"
              onClick={handleLoyaltyProgram}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Loyalty Program</span>
            </div>
            <div 
              className="quick-link-button settings-link"
              onClick={handleAccountSettings}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Account Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;