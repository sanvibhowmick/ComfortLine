const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios'); // Add this if not already at the top

dotenv.config();

const app = express();

// Allow CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your frontend URL
  methods: 'GET,POST', // Allow necessary HTTP methods
  credentials: true, // Allow cookies to be sent
}));

// Setup passport session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Set up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Middleware for handling sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Route to initiate Google OAuth login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google login

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { displayName, emails, photos } = req.user;

    // Redirect to frontend with query params
    res.redirect(`http://localhost:5173/?name=${encodeURIComponent(displayName)}&email=${encodeURIComponent(emails[0].value)}&photo=${encodeURIComponent(photos[0].value)}`);
  }
);


// Logout route
app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');  // Redirect to home page after logout
  });
});

// Home route for testing backend
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// Chat API route to handle chatbot communication
app.post('/api/chat', express.json(), async (req, res) => {
  const { messages } = req.body;

  try {
    // Ensure messages array is valid and includes role and content
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages must be an array.' });
    }

    // Make the request to OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages,
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Send the assistant's reply back to the frontend
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong with the AI response.' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server started on http://localhost:3000');
});
