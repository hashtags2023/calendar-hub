const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("googleapis"); // ✅ Only import once

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(
  session({
    secret: "calendarhub",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("✅ Logged in user:", profile.displayName);
      profile.accessToken = accessToken;
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("❌ Unauthorized");
    }
    res.send("✅ Google Auth Success! You can now fetch events.");
  }
);

app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send("❌ Not logged in");
  }
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
  });
});

// ✅ Only one /events route
app.get("/events", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).send("❌ Not authenticated");
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.json(response.data.items);
  } catch (err) {
    console.error("❌ Failed to fetch events:", err);
    res.status(500).send("Failed to fetch calendar events");
  }
});

app.get("/", (req, res) => {
  res.send("✅ Calendar API is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
