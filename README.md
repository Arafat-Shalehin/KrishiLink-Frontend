 # 🌾 KrishiLink - Crop Trading Platform

### Live Site URL: [https://krishilink-a8922.web.app](https://krishilink-a8922.web.app)

KrishiLink is a modern agricultural trading platform designed to connect **farmers** and **buyers** directly.  
It empowers farmers to post their crops for sale, receive buyer interests, and manage deals easily — all in one place.

---

## 🚀 Features

- 🔒 **Private Dashboard** – Logged-in users can manage their crops, edit or delete posts, and view received interests.
- 🌱 **My Interests Page** – Buyers can track all their crop interest requests with real-time status updates.
- 💬 **Interest Management** – Owners can accept or reject interests; accepted requests automatically reduce crop quantity.
- 🧠 **Dynamic Data Handling** – Fully integrated with a backend API (Node.js + MongoDB) for smooth CRUD operations.
- 🎨 **Professional UI/UX** – Built with React, Tailwind CSS, and Framer Motion for a clean, interactive experience.

---

## 🧩 Tech Stack

- **Frontend:** React.js, React Router, Tailwind CSS, Framer Motion  
- **State & Auth:** Context API, Firebase Authentication  
- **HTTP Requests:** Axios  
- **Notifications:** React Toastify

---

## 🔧 Installation & Setup

### Go step by step  
```bash
git clone
cd krishilink-frontend
npm install
Create a .env.local file and add your Firebase + Backend credentials:
VITE_api_url=<YOUR_BACKEND_URL>
VITE_api_key=<FIREBASE_API_KEY>
VITE_auth_domain=<FIREBASE_AUTH_DOMAIN>
VITE_project_id=<FIREBASE_PROJECT_ID>
VITE_storage_bucket=<FIREBASE_STORAGE_BUCKET>
VITE_messaging_sender_id=<FIREBASE_SENDER_ID>
VITE_app_id=<FIREBASE_APP_ID>
npm run dev
