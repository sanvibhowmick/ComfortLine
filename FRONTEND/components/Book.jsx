import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Info, ArrowLeft } from 'lucide-react';
import './Book.css';

const BusBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [passengerType, setPassengerType] = useState('Adult');
  const [formStep, setFormStep] = useState(1);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const PRICE_PER_SEAT = 1200; // Price in INR

  const busRoutes = {
    "Mumbai": ["Pune", "Nashik", "Ahmedabad"],
    "Delhi": ["Jaipur", "Chandigarh", "Agra"],
    "Bangalore": ["Chennai", "Hyderabad", "Mysore"],
    "Chennai": ["Bangalore", "Hyderabad", "Pondicherry"],
    "Hyderabad": ["Bangalore", "Chennai", "Vijayawada"]
  };

  const isFormValid = () => {
    return formStep === 1
      ? pickupLocation && dropLocation && pickupTime && pickupDate
      : selectedSeats.length > 0;
  };

  useEffect(() => {
    setConfirmDisabled(!isFormValid());
  }, [pickupLocation, dropLocation, pickupTime, pickupDate, selectedSeats, formStep]);

  useEffect(() => {
    setTotalPrice(selectedSeats.length * PRICE_PER_SEAT);
  }, [selectedSeats]);

  const getAvailableDropLocations = () => {
    if (!pickupLocation) return [];
    return busRoutes[pickupLocation] || [];
  };

  const handlePickupChange = (value) => {
    setPickupLocation(value);
    if (value && dropLocation && !busRoutes[value]?.includes(dropLocation)) {
      setDropLocation('');
    }
  };

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleConfirmBooking = () => {
    // Pass booking details to checkout page
    navigate('/checkout', {
      state: {
        bookingDetails: {
          pickupLocation,
          dropLocation,
          pickupDate,
          pickupTime,
          passengerType,
          selectedSeats,
          totalPrice,
          journeyDetails: `${pickupLocation} → ${dropLocation}, ${pickupDate} at ${pickupTime}`
        }
      }
    });
  };

  const goBack = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const renderBusSeats = () => {
    const rows = 6;
    const seatsPerRow = 5;
    const seats = [];
    let seatCounter = 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        if (col === 2) continue; // Skip middle column for aisle
        
        const seatNumber = seatCounter++;
        const isSelected = selectedSeats.includes(seatNumber);
        const isBooked = [3, 7, 12, 15, 19, 22].includes(seatNumber);

        seats.push(
          <div
            key={seatNumber}
            className={`seat ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}`}
            onClick={() => !isBooked && handleSeatSelection(seatNumber)}
            title={isBooked ? 'Already booked' : `Seat ${seatNumber}`}
          >
            {seatNumber}
          </div>
        );
      }
    }

    return seats;
  };

  const renderStepOne = () => (
    <div className="booking-container">
      <h2 className="booking-heading">
        <span className="step-circle">1</span> Journey Details
      </h2>
      <div className="form-grid">
        {/* Pickup Location */}
        <div className="input-group">
          <label>Pickup Location</label>
          <div className="input-icon">
            <MapPin className="icon" />
            <select value={pickupLocation} onChange={(e) => handlePickupChange(e.target.value)}>
              <option value="">Select Pickup Location</option>
              {Object.keys(busRoutes).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Drop Location */}
        <div className="input-group">
          <label>Drop Location</label>
          <div className="input-icon">
            <MapPin className="icon" />
            <select value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} disabled={!pickupLocation}>
              <option value="">Select Drop Location</option>
              {getAvailableDropLocations().map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Travel Date */}
        <div className="input-group">
          <label>Travel Date</label>
          <div className="input-icon">
            <Calendar className="icon" />
            <input type="date" min={today} value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
          </div>
        </div>

        {/* Departure Time */}
        <div className="input-group">
          <label>Departure Time</label>
          <div className="input-icon">
            <Clock className="icon" />
            <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}>
              <option value="">Select Departure Time</option>
              <option value="06:00 AM">06:00 AM</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </select>
          </div>
        </div>

        {/* Passenger Type */}
        <div className="input-group">
          <label>Passenger Type</label>
          <div className="input-icon">
            <Users className="icon" />
            <select value={passengerType} onChange={(e) => setPassengerType(e.target.value)}>
              <option value="Adult">Adult</option>
              <option value="Child">Child</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>
      </div>

      {pickupLocation && dropLocation && (
        <div className="route-info">
          <Info className="info-icon" />
          <p>
            Route: {pickupLocation} → {dropLocation}. Estimated Duration: {
              (pickupLocation === "Mumbai" && dropLocation === "Pune" && "3 hours") ||
              (pickupLocation === "Mumbai" && dropLocation === "Nashik" && "4 hours") ||
              (pickupLocation === "Mumbai" && dropLocation === "Ahmedabad" && "8 hours") ||
              (pickupLocation === "Delhi" && dropLocation === "Jaipur" && "5 hours") ||
              (pickupLocation === "Delhi" && dropLocation === "Chandigarh" && "6 hours") ||
              (pickupLocation === "Delhi" && dropLocation === "Agra" && "4 hours") ||
              (pickupLocation === "Bangalore" && dropLocation === "Chennai" && "6 hours") ||
              (pickupLocation === "Bangalore" && dropLocation === "Hyderabad" && "8 hours") ||
              (pickupLocation === "Bangalore" && dropLocation === "Mysore" && "3 hours") ||
              (pickupLocation === "Chennai" && dropLocation === "Bangalore" && "6 hours") ||
              (pickupLocation === "Chennai" && dropLocation === "Hyderabad" && "10 hours") ||
              (pickupLocation === "Chennai" && dropLocation === "Pondicherry" && "3 hours") ||
              (pickupLocation === "Hyderabad" && dropLocation === "Bangalore" && "8 hours") ||
              (pickupLocation === "Hyderabad" && dropLocation === "Chennai" && "10 hours") ||
              (pickupLocation === "Hyderabad" && dropLocation === "Vijayawada" && "5 hours")
            }. Price per seat: ₹{PRICE_PER_SEAT}.
          </p>
        </div>
      )}

      <button onClick={() => setFormStep(2)} disabled={confirmDisabled} className="booking-button">
        Continue to Seat Selection
      </button>
    </div>
  );

  const renderStepTwo = () => (
    <div className="booking-container">
      <button onClick={goBack} className="back-button">
        <ArrowLeft className="icon" /> Back to Journey Details
      </button>

      <h2 className="booking-heading">
        <span className="step-circle">2</span> Select Your Seats
      </h2>

      <div className="seat-grid">{renderBusSeats()}</div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-color legend-available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-booked"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="summary">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ₹{totalPrice}</p>
      </div>

      <button onClick={handleConfirmBooking} disabled={confirmDisabled} className="booking-button">
        Confirm Booking
      </button>
    </div>
  );

  return formStep === 1 ? renderStepOne() : renderStepTwo();
};

export default BusBooking;