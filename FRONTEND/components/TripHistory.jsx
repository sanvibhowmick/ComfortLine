import React, { useState, useEffect } from "react";
import "./TripHistory.jsx"

const TripHistory = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate fetching trip history data
    setTimeout(() => {
      const mockTrips = [
        {
          id: "trip-123",
          destination: "Paris, France",
          startDate: "2024-03-15",
          endDate: "2024-03-22",
          type: "vacation",
          cost: 1250.00,
          status: "completed",
          image: "P"
        },
        {
          id: "trip-124",
          destination: "Tokyo, Japan",
          startDate: "2024-12-05",
          endDate: "2024-12-18",
          type: "vacation",
          cost: 2300.00,
          status: "completed",
          image: "T"
        },
        {
          id: "trip-125",
          destination: "New York, USA",
          startDate: "2024-09-10",
          endDate: "2024-09-15",
          type: "business",
          cost: 1800.00,
          status: "completed",
          image: "N"
        },
        {
          id: "trip-126",
          destination: "Sydney, Australia",
          startDate: "2024-01-20",
          endDate: "2024-02-05",
          type: "vacation",
          cost: 3200.00,
          status: "completed",
          image: "S"
        },
        {
          id: "trip-127",
          destination: "Rome, Italy",
          startDate: "2023-11-12",
          endDate: "2023-11-19",
          type: "vacation",
          cost: 1650.00,
          status: "completed",
          image: "R"
        }
      ];
      setTrips(mockTrips);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTrips = filter === 'all' 
    ? trips 
    : trips.filter(trip => trip.type === filter);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBackToDashboard = () => {
    onNavigate && onNavigate("/");
  };

  const handleViewDetails = (tripId) => {
    console.log(`View details for trip: ${tripId}`);
    // In a real app, you might navigate to a trip detail page
    // onNavigate(`/trip/${tripId}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your trip history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 md:p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackToDashboard}
          className="mr-4 text-blue-600 hover:underline flex items-center"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Your Trip History</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">All Trips</h2>
            <p className="text-gray-600 text-sm mt-1">View and manage your past trips</p>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('vacation')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'vacation' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Vacation
            </button>
            <button 
              onClick={() => setFilter('business')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'business' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Business
            </button>
          </div>
        </div>

        {filteredTrips.length > 0 ? (
          <div className="space-y-4">
            {filteredTrips.map(trip => (
              <div 
                key={trip.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium mr-4">
                      {trip.image}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{trip.destination}</h3>
                      <p className="text-gray-600">
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Type:</span>
                      <span className="capitalize font-medium">{trip.type}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="text-gray-600 mr-2">Total cost:</span>
                      <span className="font-medium">${trip.cost.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => handleViewDetails(trip.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No trips found</h3>
            <p className="text-gray-600 mb-6">You don't have any {filter !== 'all' ? filter : ''} trips in your history yet.</p>
            <button 
              onClick={() => onNavigate && onNavigate("/book")}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Book a new trip
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Need help with a past trip?</h3>
        <p className="text-blue-700 mb-4">Our customer service is here to assist you with any questions about your previous trips.</p>
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default TripHistory;