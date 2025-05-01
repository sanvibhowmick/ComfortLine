import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './book.css';

const Book = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [confirmDisabled, setConfirmDisabled] = useState(true);

  // Function to check if the form is valid
  const isFormValid = () => {
    return pickupLocation && dropLocation && pickupTime && selectedSeats.length > 0;
  };

  // This hook will be called whenever the relevant states change
  useEffect(() => {
    setConfirmDisabled(!isFormValid());
  }, [pickupLocation, dropLocation, pickupTime, selectedSeats]);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      }
      return [...prevSelectedSeats, seatNumber];
    });
  };

  return (
    <div className="booking-container">
      {/* Dropdowns for Pickup and Dropoff */}
      <div className="dropdowns">
        <select
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Pickup Location</option>
          <option value="Location1">Location 1</option>
          <option value="Location2">Location 2</option>
        </select>

        <select
          value={dropLocation}
          onChange={(e) => setDropLocation(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Drop Location</option>
          <option value="Location1">Location 1</option>
          <option value="Location2">Location 2</option>
        </select>

        <select
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="dropdown"
        >
          <option value="">Select Pickup Time</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="02:00 PM">02:00 PM</option>
        </select>
      </div>

      {/* Bus Background and Seat Map */}
      <div className="bus-background">
        <div className="seat-map">
          {Array.from({ length: 40 }, (_, index) => {
            const seatNumber = index + 1;
            const isSelected = selectedSeats.includes(seatNumber);

            return (
              <div
                key={seatNumber}
                className={`seat ${isSelected ? 'selected' : 'unoccupied'}`}
                onClick={() => handleSeatSelection(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm Button with Link to Checkout and Passing Data */}
      <Link
        to="/checkout"
        state={{
          tickets: selectedSeats.length,
          pickupLocation,
          dropLocation,
          pickupTime,
        }}
      >
        <button
          disabled={confirmDisabled}
          className={`confirm-button ${confirmDisabled ? 'disabled' : ''}`}
        >
          Confirm Booking
        </button>
      </Link>
    </div>
  );
};

export default Book;
