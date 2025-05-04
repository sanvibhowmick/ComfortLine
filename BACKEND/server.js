const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

// Initialize Gemini API with error handling
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('Error initializing Gemini API:', error);
}

const app = express();

// Allow CORS for frontend with improved configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  maxAge: 86400, // 24 hours in seconds
}));

// Middleware to parse JSON with increased limit for larger messages
app.use(express.json({ limit: '2mb' }));

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

// Middleware for handling sessions with improved security
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key-for-dev',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
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
 
// Logout route with improved error handling
app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Home route for testing backend
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// Chat API route with improved error handling and timeout
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  // Check if Gemini API is properly initialized
  if (!genAI) {
    return res.status(503).json({ 
      error: 'AI service unavailable. Please check your API key configuration.'
    });
  }

  try {
    // Validate request
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages must be an array.' });
    }

    if (messages.length === 0) {
      return res.status(400).json({ error: 'At least one message is required.' });
    }

    // Format messages for Gemini API
    const conversationHistory = messages.map(msg => {
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      };
    });

    // Set timeout for the Gemini API request
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('AI request timeout')), 10000); // 10 seconds timeout
    });

    // Get the model - FIXED: using gemini-1.5-pro instead of gemini-pro
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',  // Updated model name
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topK: 40,
        topP: 0.95,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    });
    
    // Create a chat session
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1), // All messages except the latest one
    });

    // Get response for the latest message with timeout
    const lastUserMessage = messages[messages.length - 1].content;
    
    // Race between the AI response and the timeout
    const result = await Promise.race([
      chat.sendMessage(lastUserMessage),
      timeoutPromise
    ]);
    
    const response = await result.response;
    const text = response.text();

    // Send the assistant's reply back to the frontend
    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Provide more helpful error messages based on the error type
    if (error.message === 'AI request timeout') {
      return res.status(504).json({ error: 'The AI response took too long. Please try again.' });
    } else if (error.message?.includes('429')) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    } else if (error.message?.includes('401') || error.message?.includes('403')) {
      return res.status(401).json({ error: 'Authentication error with the AI service.' });
    } else if (error.message?.includes('404')) {
      return res.status(404).json({ 
        error: 'AI model not found. Please check your API key and model configuration.',
        details: 'Try checking if your API key has access to the specified model.'
      });
    }
    
    res.status(500).json({ 
      error: 'Something went wrong with the AI response. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// List available Gemini models endpoint
app.get('/api/models', async (req, res) => {
  if (!genAI) {
    return res.status(503).json({ error: 'AI service unavailable' });
  }

  try {
    // Attempt to list available models
    const result = await genAI.listModels();
    res.json({ models: result });
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve model list',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    geminiInitialized: !!genAI
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});