import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css';

const CheckoutPage = () => {
  const location = useLocation();
  
  // Retrieve data passed from the booking page (number of tickets, pickup/dropoff info)
  const { tickets, pickupLocation, dropLocation, pickupTime } = location.state || {}; 
  
  // Log the location.state to check the data being passed
  console.log(location.state);  // Check if dropoffLocation is present

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send the data to the backend)
    console.log(formData);
  };

  return (
    <main>
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4 logo"
          src="src/WhatsApp Image 2025-04-29 at 16.16.53_e448980f.jpg"
          alt="Logo"
          style={{ width: '100px', height: '100px' }} // Logo size fixed to 100px by 100px
        />
        <h1 className="h2">Checkout form</h1>
      </div>

      <div className="row g-5 justify-content-center">
        <div className="col-md-5 col-lg-4 order-md-first">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{tickets}</span> {/* Display number of tickets */}
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Bus Tickets</h6>
                <small className="text-body-secondary">Ticket(s) for your journey</small>
              </div>
              <span className="text-body-secondary">₹{tickets * 10}</span> {/* Example price calculation */}
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{tickets * 10}</strong> {/* Total calculation based on tickets */}
            </li>
            {/* Display pickup and dropoff information below the ticket details */}
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Pickup Location</h6>
                <small className="text-body-secondary">{pickupLocation}</small> {/* Pickup Location */}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Dropoff Location</h6>
                <small className="text-body-secondary">{dropLocation}</small> {/* Dropoff Location */}
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Pickup Time</h6>
                <small className="text-body-secondary">{pickupTime}</small> {/* Pickup Time */}
              </div>
            </li>
          </ul>
        </div>

        <div className="col-md-7 col-lg-8">
        
          <h4 className="mb-3">Billing address</h4>
          <form onSubmit={handleSubmit} className="needs-validation" novalidate="">
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Valid first name is required.</div>
              </div>
              

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Valid last name is required.</div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">Please enter a valid email address for shipping updates.</div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please enter your shipping address.</div>
              </div>
            </div>

            <hr className="my-4" />
            <button className="w-100 btn btn-success btn-lg" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
