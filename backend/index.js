const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const PORT = process.env.PORT || 5000;

// Session middleware
app.use(
  session({
    secret: "calendarhub",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // <- Add this
    },
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("✅ Logged in user:", profile.displayName);
      console.log("📛 Google ID:", profile.id);
      console.log("🔑 Access Token:", accessToken);
      profile.accessToken = accessToken;
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user)); // Return user object
passport.deserializeUser((obj, done) => done(null, obj)); // Return user object

// OAuth login route
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
  })
);

// OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("🔄 Auth Callback: req.user = ", req.user);
    if (!req.user) {
      return res.status(401).send("❌ Unauthorized");
    }
    res.send("✅ Google Auth Success! You can now fetch events.");
  }
);

// Temporary endpoint/route to view session info for DEBUGGING purposes
app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).send("❌ Not logged in");
  }
  res.json({
    id: req.user.id,
    displayName: req.user.displayName,
  });
});

// Basic route
app.get("/", (req, res) => {
  res.send("✅ Calendar API is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
