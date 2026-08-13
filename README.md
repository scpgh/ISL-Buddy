#  ISL Buddy — Gamified Indian Sign Language Self-Learning Platform

[![UN SDG 4: Quality Education](https://img.shields.io/badge/UN%20SDG-4%20Quality%20Education-58cc02?style=for-the-badge)](https://sdgs.un.org/goals/goal4)
[![UN SDG 10: Reduced Inequalities](https://img.shields.io/badge/UN%20SDG-10%20Reduced%20Inequalities-1cb0f6?style=for-the-badge)](https://sdgs.un.org/goals/goal10)
[![ISLRTC Certified Curriculum](https://img.shields.io/badge/Curriculum-ISLRTC%20Govt%20of%20India-ffc800?style=for-the-badge)](http://www.islrtc.nic.in/)

**ISL Buddy** is an interactive, gamified self-learning web platform designed according to the official Government of India **Indian Sign Language Research and Training Centre (ISLRTC)** curriculum. It empowers learners across India with HD video modules, an AI-powered ISL Assistant, real registered learner leaderboards, LeetCode-style streak tracking, and emergency SOS communication displays.

---

##  Features & Key Highlights

- 📹 **Interactive Video Modules**: Step-by-step HD video lessons starting from Course Overview through complete ISLRTC Modules.
-  **ISL Buddy AI Assistant**: Groq LLM-powered AI instructor answering queries on handshapes, 3D chest space signing, SOV grammar rules, and deaf culture.
-  **LeetCode-Style Streak Counter**: Live animated fire badge tracking consecutive learning days.
-  **100% Real Learner Leaderboard**: Live ranking system reflecting real registered users, XP earned, and level achievements.
-  **SOS Emergency Communication Cards**: High-visibility display cards for Medical (108), Police (100), and Deaf assistance with an authentic 2-tone emergency siren sound engine.
-  **Profile & Display Name Customization**: Inline display name editing with real-time leaderboard synchronization.
-  **Multi-Language Support**: Seamless toggling between **English** and **हिन्दी (Hindi)**.
-  **Dark & Light Mode**: Curated high-contrast Duolingo-inspired UI with smooth transitions.

---

##  Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, Web Audio API
- **Backend API**: Node.js, Micro-HTTP Server Engine, Groq AI API
- **Authentication**: Firebase Authentication (Email/Password & Google OAuth)
- **Deployment**: Vercel (Frontend SPA) + Render (Backend API Microservice)

---

##  Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/scpgh/ISL-Buddy.git
cd ISL-Buddy
```

### 2. Install Dependencies
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 3. Start Development Servers
```bash
# Terminal 1: Run Backend Server (Port 5000)
cd server
npm run server

# Terminal 2: Run Frontend Client (Port 3000)
cd client
npm run dev
```

Open `http://localhost:3000` in your browser to start learning!

---

##  Production Deployment

For full deployment instructions to **Render.com** (Backend) and **Vercel.com** (Frontend), refer to [deployment_guide.md](./deployment_guide.md).



