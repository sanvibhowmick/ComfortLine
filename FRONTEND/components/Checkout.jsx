import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, User, Check, ArrowLeft } from 'lucide-react';
import './Checkout.css';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Pricing constants
  const SEAT_PRICE = 1200; // Price in INR
  const TAX_RATE = 0.18; // GST in India (18%)

  useEffect(() => {
    // Get booking details from location state or localStorage
    if (location.state && location.state.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
      localStorage.setItem('bookingDetails', JSON.stringify(location.state.bookingDetails));
    } else {
      const savedDetails = localStorage.getItem('bookingDetails');
      if (savedDetails) {
        setBookingDetails(JSON.parse(savedDetails));
      } else {
        // Redirect back to booking if no details found
        navigate('/book');
      }
    }
  }, [location.state, navigate]);

  const calculateSubtotal = () => {
    if (!bookingDetails || !bookingDetails.selectedSeats) return 0;
    return bookingDetails.selectedSeats.length * SEAT_PRICE;
  };

  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }

    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }

    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentInfo({
      ...paymentInfo,
      cardNumber: formatted
    });
    
    if (errors.cardNumber) {
      setErrors({
        ...errors,
        cardNumber: ''
      });
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,2}', 'g')).join('/');
    }
    if (value.length > 5) {
      value = value.substring(0, 5);
    }
    
    setPaymentInfo({
      ...paymentInfo,
      expiryDate: value
    });
    
    if (errors.expiryDate) {
      setErrors({
        ...errors,
        expiryDate: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      // Clear localStorage after successful payment
      setTimeout(() => {
        localStorage.removeItem('bookingDetails');
        navigate('/');
      }, 3000);
    }, 2000);
  };

  const handleBackToBooking = () => {
    navigate('/book');
  };

  if (!bookingDetails) {
    return (
      <div className="checkout-loading">
        <div className="spinner"></div>
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="checkout-success">
        <div className="success-icon">
          <Check size={50} color="#4CAF50" />
        </div>
        <h2>Payment Successful!</h2>
        <p>Your booking has been confirmed.</p>
        <div className="booking-reference mt-4">
          <p><strong>Booking Reference:</strong> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          <p><strong>Total Amount Paid:</strong> ₹{calculateTotal().toFixed(2)}</p>
        </div>
        <p className="redirect-message mt-4">You will be redirected to the homepage shortly...</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-button" onClick={handleBackToBooking}>
          <ArrowLeft size={18} />
          <span>Back to Booking</span>
        </button>
        <h1>Checkout</h1>
      </div>
      
      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="booking-details">
            <div className="detail-item">
              <span>Route:</span>
              <span>{bookingDetails.pickupLocation} to {bookingDetails.dropLocation}</span>
            </div>
            <div className="detail-item">
              <span>Date:</span>
              <span>{bookingDetails.pickupDate}</span>
            </div>
            <div className="detail-item">
              <span>Time:</span>
              <span>{bookingDetails.pickupTime}</span>
            </div>
            <div className="detail-item">
              <span>Passenger Type:</span>
              <span>{bookingDetails.passengerType}</span>
            </div>
            <div className="detail-item">
              <span>Selected Seats:</span>
              <span>{bookingDetails.selectedSeats.join(', ')}</span>
            </div>
          </div>
          
          <div className="price-breakdown">
            <div className="price-item">
              <span>Seats ({bookingDetails.selectedSeats.length} × ₹{SEAT_PRICE})</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="price-item">
              <span>GST ({(TAX_RATE * 100).toFixed(0)}%)</span>
              <span>₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="price-item total">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="payment-form">
          <h2>Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <User className="input-icon" size={18} />
                Name on Card
              </label>
              <input
                type="text"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={handleInputChange}
                placeholder="Rahul Sharma"
                className={errors.cardName ? 'error' : ''}
              />
              {errors.cardName && <span className="error-message">{errors.cardName}</span>}
            </div>
            
            <div className="form-group">
              <label>
                <CreditCard className="input-icon" size={18} />
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={errors.cardNumber ? 'error' : ''}
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>
                  <Calendar className="input-icon" size={18} />
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>
              
              <div className="form-group cvv-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="saveCard"
                id="saveCard"
                checked={paymentInfo.saveCard}
                onChange={handleInputChange}
              />
              <label htmlFor="saveCard">Save this card for future purchases</label>
            </div>
            
            <button
              type="submit"
              className={`pay-button ${isProcessing ? 'processing' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="spinner-small"></div>
                  Processing...
                </>
              ) : (
                `Pay ₹${calculateTotal().toFixed(2)}`
              )}
            </button>
          </form>
          
          <div className="security-notice">
            <p>All payments are secure and encrypted. By making a payment you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;