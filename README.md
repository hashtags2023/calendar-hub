# 📅 Calendar Hub

**Calendar Hub** is a unified calendar web app that aggregates events from multiple sources (Google Calendar, Apple Calendar, Microsoft Outlook/365) and displays them in a single interface.

## 🚀 Features

- 🌐 Frontend with React
- 🧠 Backend with Node.js + Express
- 🔐 Google OAuth 2.0 login (via Passport.js)
- 📅 Fetch and display calendar events
- 🔌 API-ready for integrating Apple & Microsoft calendars
- 🌈 Clean UI with plans for full calendar view (React Big Calendar)

---

## 🛠️ Tech Stack

| Layer       | Tech                                     |
|------------|-------------------------------------------|
| Frontend   | React, React-Big-Calendar, Moment.js      |
| Backend    | Node.js, Express, CORS, Dotenv            |
| Auth       | Passport.js, Google OAuth 2.0             |
| Hosting    | GitHub (code)                             |

---

## 📁 Project Structure

```bash
calendar-hub/
├── backend/           # Node.js + Express server
│   ├── index.js       # Main backend logic
│   └── .env           # Google OAuth credentials (excluded from Git)
├── frontend/          # React application
│   ├── src/           # React components & views
│   └── .env           # (optional) React environment vars
├── .gitignore
└── README.md
```
---

## 🚀 Getting Started 

### 1. Clone the Repo
```bash
git clone https://github.com/hashtags2023/calendar-hub.git
cd calendar-hub
````
### 📁 🔧 2. Setup the Backend
```bash
cd backend
npm install
````
**Create a .env file inside the backend/ directory with the following content:** 
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
PORT=5000
```
**Then, start the backend server:**
```bash
node index.js
```
🟢 The backend should now be running at: http://localhost:5000
### 💻 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm start
```
🟢 The frontend should launch at: http://localhost:3000
### 🔐 4. Prevent Secrets from Being Committed
**Make sure your .gitignore file includes:**
```bash
# Ignore environment variables
*.env
```
### ✅ 5. Test Google OAuth Flow
1. Go to http://localhost:5000/auth/google
2. Log in with your Google account
3. You’ll see a success message confirming authentication
4. 
### 🛠 Tech Stack
Frontend: React, React Big Calendar, Date-fns
Backend: Node.js, Express, Passport.js
OAuth: Google OAuth 2.0
Storage: (Future) Local or cloud-based calendar data normalization
### 📅 Feature Roadmap
 Google Calendar OAuth Integration
 Microsoft Outlook Calendar Integration
 Apple Calendar Integration
 Unified calendar UI using React Big Calendar
 Event creation & editing
 Responsive design for mobile
### 🙌 Contributions
Contributions are welcome! To contribute:
Fork the repository
Create a new branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m "Add your feature"
Push to your fork: git push origin feature/your-feature-name
Open a pull request
### 📄 License
MIT License © 2025 hashtags2023
### 🙋‍♀️ Questions?
Open an issue or reach out directly. Happy building!
