import React, { useState } from 'react';
import './ChatBox.css';
import axios from 'axios';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State to track whether chat is expanded or collapsed

  // Function to handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    // Add the user's message to the messages state
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setUserMessage(''); // Clear the input field
    setIsLoading(true); // Show loading spinner

    try {
      // Sending the chat request to the backend (localhost:3000/api/chat)
      const response = await axios.post(
        'http://localhost:3000/api/chat',
        {
          messages: [
            ...messages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: userMessage },
          ],
        },
        {
          withCredentials: true, // This is important to include if you're using sessions/cookies
        }
      );

      // Get the response from your backend and update the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'assistant', text: response.data.reply },
      ]);
    } catch (error) {
      console.error('Error fetching from the backend:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'assistant', text: 'Sorry, something went wrong.' },
      ]);
    }

    setIsLoading(false); // Hide loading spinner after response
  };

  // Toggle the expansion state
  const toggleChat = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header" onClick={toggleChat}>
        <h4>{isExpanded ? 'Close Chat' : 'Chat with us!'}</h4>
      </div>
      {isExpanded && (
        <div className="chatbot-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user' : 'assistant'}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && <div className="loading">Typing...</div>}
          </div>
        </div>
      )}
      {isExpanded && (
        <div className="chatbot-footer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
