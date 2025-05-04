import React, { useEffect, useRef } from "react";
import "./FeaturesSection.css"; // Ensure this CSS file contains the .green-heading class

export default function FeaturesSection() {
  const featureRef = useRef([]);

  useEffect(() => {
    // Create the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add the animation class when the element enters the viewport
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    // Observe each feature item
    featureRef.current.forEach((item) => observer.observe(item));

    return () => {
      // Cleanup observer when component is unmounted
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container py-5">
      <div className="row g-4 py-5 d-flex justify-content-between">
        {/* First Feature */}
        <div
          className="col-12 col-md-4 d-flex align-items-start feature-item"
          ref={(el) => (featureRef.current[0] = el)}
        >
          <div className="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <img src="\assets\image copy.png" alt="Bus Icon" width="40" height="40" />
          </div>
          <div>
            <h3 className="fs-2 green-heading">Comfortable Travel</h3>
            <p>
              Our buses are equipped with premium seating, air conditioning, and spacious legroom for a comfortable journey.
            </p>
            <a href="./about" className="btn btn-green">
              Learn More
            </a>
          </div>
        </div>

        {/* Second Feature */}
        <div
          className="col-12 col-md-4 d-flex align-items-start feature-item"
          ref={(el) => (featureRef.current[1] = el)}
        >
          <div className="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <img src="\assets\time.png" alt="Clock Icon" width="40" height="40" />
          </div>
          <div>
            <h3 className="fs-2 green-heading">Timely Service</h3>
            <p>
              Our buses run on time, ensuring that you reach your destination promptly. Enjoy stress-free travel with Comfortline.
            </p>
            <a href="./about" className="btn btn-green">
              Learn More
            </a>
          </div>
        </div>

        {/* Third Feature */}
        <div
          className="col-12 col-md-4 d-flex align-items-start feature-item"
          ref={(el) => (featureRef.current[2] = el)}
        >
          <div className="icon-square bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <img src="\assets\track.png" alt="GPS Icon" width="40" height="40" />
          </div>
          <div>
            <h3 className="fs-2 green-heading">Real-Time Tracking</h3>
            <p>
              Track your bus in real time through our mobile app to stay updated on your journey's progress.
            </p>
            <a href="./about" className="btn btn-green">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
