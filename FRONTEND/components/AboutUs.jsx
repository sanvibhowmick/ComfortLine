import React from 'react';
import './AboutUs.css'; // Import custom styles if needed

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* About Us Content */}
      <section className="about-us-intro">
        <h2>About Us</h2>
        <p align="center">
        Welcome to Comfortline!
We are a modern travel company dedicated to redefining your bus journey. At Comfortline, we believe that travel should be more than just getting from point A to point B — it should be an experience marked by ease, safety, and comfort. Whether you're commuting daily, planning a weekend getaway, or exploring new cities, our mission is to make your travel journey smooth, reliable, and enjoyable.

Our buses are equipped with modern amenities, real-time tracking, and trained staff to ensure your peace of mind. We offer flexible routes, pocket-friendly pricing, and a seamless booking experience — because you deserve better travel.
Join thousands of happy passengers who choose Comfortline for their everyday and long-distance trips. We’re not just moving people — we’re moving experiences forward.
        </p>
      </section>

      {/* Custom Cards Section */}
      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 border-bottom">Why Us?</h2>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: 'url(/assets/safety.png)', // Corrected path
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Safety First</h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="..\dist\assets\WhatsApp Image 2025-04-29 at 16.16.53_e448980f.jpg" // Corrected path
                      alt="Bootstrap"
                      width="50"
                      height="50"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg
                      className="bi me-2"
                      width="1em"
                      height="1em"
                      role="img"
                      aria-label="Location"
                    >
                      <use xlinkHref="#geo-fill" />
                    </svg>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg
                      className="bi me-2"
                      width="1em"
                      height="1em"
                      role="img"
                      aria-label="Duration"
                    >
                      <use xlinkHref="#calendar3" />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: 'url(/assets/happy.png)', // Corrected path
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Affordable Prices</h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="..\dist\assets\WhatsApp Image 2025-04-29 at 16.16.53_e448980f.jpg" // Corrected path
                      alt="Bootstrap"
                      width="50"
                      height="50"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg
                      className="bi me-2"
                      width="1em"
                      height="1em"
                      role="img"
                      aria-label="Location"
                    >
                      <use xlinkHref="#geo-fill" />
                    </svg>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg
                      className="bi me-2"
                      width="1em"
                      height="1em"
                      role="img"
                      aria-label="Duration"
                    >
                      <use xlinkHref="#calendar3" />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: 'url(/assets/image.png)', // Corrected path
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Flexible Routes</h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="..\dist\assets\WhatsApp Image 2025-04-29 at 16.16.53_e448980f.jpg" // Corrected path
                      alt="Bootstrap"
                      width="50"
                      height="50"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg
                      className="bi me-2"
                      width="1em"
                      height="1em"
                      role="img"
                      aria-label="Location"
                    >
                      <use xlinkHref="#geo-fill" />
                    </svg>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg
                      className="bi me-2"
                      width="1em"
                      height="1em"
                      role="img"
                      aria-label="Duration"
                    >
                      <use xlinkHref="#calendar3" />
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
