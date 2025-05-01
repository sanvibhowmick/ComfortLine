import React from 'react';
import './ContactUs.css';

export default function ContactUs() {
  return (
    <div className="contact-us-wrapper">
      <div className="contact-info">
        <h2>Contact ComfortLine</h2>
        <p>We’re here to assist you 24/7. Reach out to us via any of the following ways:</p>

        <ul>
          <li><strong>📞 Customer Support:</strong> +91 98765 43210</li>
          <li><strong>📧 Email:</strong> support@comfortline.in</li>
          <li><strong>🏢 Office Address:</strong> 12A, Park Street, Kolkata, India</li>
          <li><strong>🌐 Website:</strong> www.comfortline.in</li>
          <li>
            <strong>🔗 Follow Us:</strong><br />
            Instagram: <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">@comfortline</a><br />
            Twitter: <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">@comfortline</a><br />
            Facebook: <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">@comfortline</a>
          </li>
        </ul>
      </div>

      <div className="contact-form-section">
        <h3>Send Us a Message</h3>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="tel" placeholder="Your Phone Number (optional)" />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
