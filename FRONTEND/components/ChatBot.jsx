import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css'; // Optional, for custom styling

const ComfortLineChatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && messages.length === 0) {
      setMessages([
        { 
          sender: 'assistant', 
          text: 'Welcome to ComfortLine! How can I help you with booking a ride or answering questions about our bus services?' 
        }
      ]);
    }
  }, [isExpanded, messages.length]);

  const handleSubmit = async () => {
    if (!userMessage.trim()) return;
    setConnectionError(false);
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    const currentMessage = userMessage;
    setUserMessage('');
    setIsLoading(true);

    try {
      setTimeout(() => {
        const botResponse = getBotResponse(currentMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'assistant', text: botResponse },
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching from backend:', error);
      setConnectionError(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          sender: 'assistant', 
          text: 'Sorry, I\'m having trouble connecting to our booking system. Please try again or contact us directly at support@comfortline.com.' 
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleChat = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderMessageContent = (text) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('book') || lowerMsg.includes('reservation') || lowerMsg.includes('ride')) {
      return "To book a ride with ComfortLine, you can:\n1. Use our online booking form at comfortline.com/book\n2. Call our booking line at (555) 123-4567\n3. Visit our terminal locations\n\nWould you like me to help you with the booking process?";
    }
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('fare') || lowerMsg.includes('ticket')) {
      return "Our fares depend on your route and travel date. For the most accurate pricing, please provide your departure city, destination, and travel date. You can also check fares on our website at comfortline.com/fares.";
    }
    if (lowerMsg.includes('cancel') || lowerMsg.includes('refund')) {
      return "To cancel a booking and request a refund, please log into your account on our website or contact our customer service team at (555) 123-4567 with your booking reference number. Please note that our refund policy varies depending on how far in advance you cancel.";
    }
    if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('support')) {
      return "You can contact ComfortLine through:\n- Phone: (555) 123-4567\n- Email: support@comfortline.com\n- Live chat on our website\n- Visit one of our terminal locations\n\nOur customer service team is available Monday-Friday 8am-8pm and Saturday-Sunday 9am-5pm.";
    }
    if (lowerMsg.includes('route') || lowerMsg.includes('destination') || lowerMsg.includes('where')) {
      return "ComfortLine operates routes throughout the region, connecting major cities and towns. To see all available routes, please visit comfortline.com/routes. Where are you looking to travel to?";
    }
    if (lowerMsg.includes('baggage') || lowerMsg.includes('luggage')) {
      return "Each passenger can bring one piece of luggage (up to 50lbs) and one personal item for free. Additional or overweight bags may incur fees. Special items like bikes or sports equipment may require advance notice. Check our baggage policy at comfortline.com/baggage for details.";
    }
    if (lowerMsg.includes('schedule') || lowerMsg.includes('time') || lowerMsg.includes('depart') || lowerMsg.includes('arrive')) {
      return "Our buses run on regular schedules with multiple departures daily for popular routes. For specific departure and arrival times, please visit our website or provide your desired route and travel date, and I can check the schedule for you.";
    }
    if (lowerMsg.includes('covid') || lowerMsg.includes('safety') || lowerMsg.includes('clean')) {
      return "Your safety is our priority at ComfortLine. We maintain rigorous cleaning protocols, including sanitizing buses between trips. Our ventilation systems are regularly maintained, and we follow all public health guidelines. Learn more about our safety measures at comfortline.com/safety.";
    }
    if (lowerMsg.includes('wifi') || lowerMsg.includes('amenities') || lowerMsg.includes('service')) {
      return "ComfortLine buses offer several amenities for your comfort:\n- Free WiFi\n- Power outlets at every seat\n- Reclining seats\n- Onboard restrooms on long-distance routes\n- Climate control\n- Entertainment system on select routes";
    }

    return "Thank you for your message. I can help with booking rides, checking schedules, answering questions about routes, fares, baggage policies, and more. Could you please provide more details about what you need assistance with?";
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header" onClick={toggleChat}>
        <div className="chatbot-header-content">
          <div className="chatbot-icon green-icon">
            💬
          </div>
          <h4 style={{ color: 'white' }}>
            {isExpanded ? 'Close Chat' : 'Chat with us'}
          </h4>
        </div>
      </div>

      {isExpanded && (
        <div className="chatbot-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="message-bubble">
                  {renderMessageContent(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            {connectionError && (
              <div className="connection-error">
                ⚠️ <span>Connection issue. Please try again.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="chatbot-footer">
          <div className="input-container">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about bookings, routes, etc..."
              className="chat-input"
              disabled={isLoading}
            />
            <button 
              onClick={handleSubmit} 
              className="send-button"
              disabled={isLoading || !userMessage.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComfortLineChatbot;
