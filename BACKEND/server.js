const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Dummy user DB (use real DB in production)
let users = {};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users[id];
  done(null, user || false);
});

// Passport Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const user = {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0]?.value,
    photoUrl: profile.photos?.[0]?.value,
    loyaltyPoints: 450,
    upcomingTrips: 2,
    pastTrips: 7,
    memberSince: new Date().toISOString()
  };

  users[user.id] = user;
  return done(null, user);
}));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running.');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    const { id, name, email, photoUrl, loyaltyPoints, upcomingTrips, pastTrips, memberSince } = req.user;

    const redirectUrl = `http://localhost:5173/dashboard?userId=${id}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}${photoUrl ? `&photo=${encodeURIComponent(photoUrl)}` : ''}&loyaltyPoints=${loyaltyPoints}&upcomingTrips=${upcomingTrips}&pastTrips=${pastTrips}&memberSince=${encodeURIComponent(memberSince)}`;

    res.redirect(redirectUrl);
  }
);

// Check authentication status
app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout endpoint
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }

    // Destroy session and cookies
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session destruction failed' });
      }
      
      // Clear cookies (if any)
      res.clearCookie('connect.sid');
      
      // Redirect to home page or login page
      res.redirect('http://localhost:5173');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
