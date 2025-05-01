import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="hero">
      <div className="hero-content" data-aos="fade-up" data-aos-duration="1500">
        <h1 className="hero-heading typing-text">
          Where Every Journey Begins with Comfort
        </h1>
        <p className="hero-subheading">
          Travel in style with ComfortLine, your trusted partner for unforgettable trips.
        </p>
        <a href="/book" className="cta-button hero-button">
          Book Your Ride
        </a>
      </div>
    </section>
  );
};

export default Hero;
