import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
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

  const today = new Date().toISOString().split('T')[0];

  const isFormValid = () => {
    return formStep === 1
      ? pickupLocation && dropLocation && pickupTime && pickupDate
      : selectedSeats.length > 0;
  };

  useEffect(() => {
    setConfirmDisabled(!isFormValid());
  }, [pickupLocation, dropLocation, pickupTime, pickupDate, selectedSeats, formStep]);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleConfirmBooking = () => {
    alert(`Booking confirmed!
    Pickup: ${pickupLocation}
    Drop: ${dropLocation}
    Date: ${pickupDate}
    Time: ${pickupTime}
    Passenger Type: ${passengerType}
    Seats: ${selectedSeats.join(', ')}`);
  };

  const renderStepOne = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
        Journey Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Pickup Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
              <option value="">Select Pickup Location</option>
              <option value="New York City">New York City</option>
              <option value="Boston">Boston</option>
              <option value="Philadelphia">Philadelphia</option>
              <option value="Washington DC">Washington DC</option>
            </select>
          </div>
        </div>

        {/* Drop Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
              <option value="">Select Drop Location</option>
              <option value="New York City">New York City</option>
              <option value="Boston">Boston</option>
              <option value="Philadelphia">Philadelphia</option>
              <option value="Washington DC">Washington DC</option>
            </select>
          </div>
        </div>

        {/* Travel Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Time Picker */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 py-2 text-gray-900 shadow-sm focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
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
      </div>
      <button
        onClick={() => setFormStep(2)}
        className="confirm-button mt-4"
        disabled={confirmDisabled}
      >
        Continue to Seat Selection
      </button>
    </div>
  );

  const renderStepTwo = () => (
    <div className="seats-container">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Select Your Seats</h2>
      <div className="seat-map">
        {Array.from({ length: 30 }, (_, i) => {
          const seatNumber = i + 1;
          const isSelected = selectedSeats.includes(seatNumber);
          return (
            <div
              key={seatNumber}
              className={`seat available ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSeatSelection(seatNumber)}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>
      <button
        className="confirm-button mt-6"
        onClick={handleConfirmBooking}
        disabled={confirmDisabled}
      >
        Confirm Booking
      </button>
    </div>
  );

  return (
    <div className="booking-container">
      {formStep === 1 ? renderStepOne() : renderStepTwo()}
    </div>
  );
};

export default BusBooking;
