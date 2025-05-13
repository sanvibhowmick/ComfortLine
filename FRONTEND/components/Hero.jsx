import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Hero.css";
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  // TypeWriter effect with multiple text options
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const texts = [
    "Where Every Journey Begins with Comfort",
    "Luxury on the Move, Comfort in Every Ride",
    "Reliability and Comfort, Mile After Mile"
  ];
  
  const typingRef = useRef(null);
  
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];
      
      setTypewriterText(
        isDeleting
          ? fullText.substring(0, typewriterText.length - 1)
          : fullText.substring(0, typewriterText.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 30 : 150);
      
      if (!isDeleting && typewriterText === fullText) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typewriterText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    typingRef.current = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingRef.current);
  }, [typewriterText, isDeleting, loopNum, typingSpeed, texts]);

  return (
    <section className="hero">
      {/* Video Background */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="\assets\Generated video 1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-overlay"></div>
      <div className="hero-content" data-aos="fade-up" data-aos-duration="1500">
        <h1 className="hero-heading">
          <span className="typing-text">{typewriterText}</span>
          <span className="cursor"></span>
        </h1>
        <p className="hero-subheading">
          Travel in style with ComfortLine, your trusted partner for unforgettable trips.
        </p>
        <Link to="/book" className="cta-button hero-button">
          Book Your Ride
        </Link>
      </div>
    </section>
  );
};

export default Hero;