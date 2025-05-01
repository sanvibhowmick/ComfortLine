import React, { useEffect } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  useEffect(() => {
    // Select all testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    // IntersectionObserver callback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('zoom-in'); // Add the zoom-in class
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the item is visible

    // Observe all testimonial cards
    testimonialCards.forEach(card => observer.observe(card));

    // Cleanup observer when component unmounts
    return () => {
      testimonialCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <section className="testimonial-section">
      <div className="testimonial-parallax">
        <div className="container">
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          <div className="row">
            {/* Testimonial 1 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="testimonial-card text-center">
                <div className="testimonial-image">
                  {/* Placeholder for the image */}
                  <img
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    src="public\assets\person1.png"
                    alt="John Doe"
                  />
                </div>
                <h5 className="testimonial-name">John Doe</h5>
                <p className="testimonial-text">
                  "ComfortLine made my travel experience unforgettable! The service was impeccable, and the journey was smooth and enjoyable."
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="testimonial-card text-center">
                <div className="testimonial-image">
                  {/* Placeholder for the image */}
                  <img
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    src="public\assets\person2.png"
                    alt="Jane Smith"
                  />
                </div>
                <h5 className="testimonial-name">Jane Smith</h5>
                <p className="testimonial-text">
                  "I’ve never felt more relaxed during my travels. The comfort and ease of booking through ComfortLine were top-notch!"
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="testimonial-card text-center">
                <div className="testimonial-image">
                  {/* Placeholder for the image */}
                  <img
                    className="bd-placeholder-img rounded-circle"
                    width="140"
                    height="140"
                    src="public\assets\person3.png"
                    alt="Samuel Lee"
                  />
                </div>
                <h5 className="testimonial-name">Samuel Lee</h5>
                <p className="testimonial-text">
                  "Amazing service! The entire booking process was so simple, and the bus ride was exceptionally comfortable."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
