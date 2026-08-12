# 🚀 ISL Buddy - Complete Production Deployment Guide

This guide details how to deploy **ISL Buddy** to **Render** (Backend API) and **Vercel** (Frontend Web App).

---

## 🛠️ Step 1: Deploy Backend to Render (Render.com)

1. Push your project repository to GitHub: `https://github.com/scpgh/ISL-Buddy.git`.
2. Go to [Render.com Dashboard](https://dashboard.render.com/) and click **New + ➔ Web Service**.
3. Connect your GitHub Repository.
4. Set the build settings:
   - **Name**: `isl-buddy-server`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add **Environment Variables** in Render Dashboard:
   - `PORT`: `5000`
   - `GROQ_API_KEY`: `<YOUR_GROQ_API_KEY_HERE>`
6. Click **Deploy Web Service**.
7. Once deployed, Render will provide your Backend Production URL (e.g. `https://isl-buddy-server.onrender.com`).

---

## ⚡ Step 2: Deploy Frontend to Vercel (Vercel.com)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New ➔ Project**.
2. Select your GitHub Repository (`ISL-Buddy`).
3. Set the project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables** in Vercel Dashboard:
   - `VITE_BACKEND_URL`: `https://isl-buddy-server.onrender.com`
   - `VITE_GROQ_API_KEY`: `<YOUR_GROQ_API_KEY_HERE>`
   - `VITE_FIREBASE_API_KEY`: `AIzaSyBoKDwQa0GQYnX7k7VNxCOZg2doZmVDtk8`
   - `VITE_FIREBASE_AUTH_DOMAIN`: `mudralearn.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`: `mudralearn`
   - `VITE_FIREBASE_STORAGE_BUCKET`: `mudralearn.firebasestorage.app`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: `160972145012`
   - `VITE_FIREBASE_APP_ID`: `1:160972145012:web:8256da2ef45d4b77562c21`
5. Click **Deploy**.
6. Vercel will instantly build your site and generate your live SSL URL (e.g. `https://isl-buddy.vercel.app`)!

---

## 🔑 Step 3: Enable Firebase Domain & CORS

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Select `mudralearn` project ➔ **Authentication ➔ Settings ➔ Authorized Domains**.
3. Add your Vercel deployment domain: `isl-buddy.vercel.app`.
