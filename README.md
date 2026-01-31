# KrishiLink (KrishiLink) — Crop Trading Platform

KrishiLink is a modern agricultural trading platform that connects **farmers** and **buyers** directly. Farmers can list crops for sale, buyers can browse and submit interest requests, and farmers can manage those interests (accept/reject). The project is built to a **production-ready** with a consistent design system, role-based dashboard foundation, secure backend authorization, and responsive UI.

---

## Live Links
- Frontend (Firebase Hosting): **[https://krishilink-a8922.web.app]**
- Backend API (Vercel): **[https://krishi-link-backend.vercel.app]**

---

## 🚀 Features

- 🔒 **Private Dashboard** – Logged-in users can manage their crops, edit or delete posts, and view received interests.
- 🌱 **My Interests Page** – Buyers can track all their crop interest requests with real-time status updates.
- 💬 **Interest Management** – Owners can accept or reject interests; accepted requests automatically reduce crop quantity.
- 🧠 **Dynamic Data Handling** – Fully integrated with a backend API (Node.js + MongoDB) for smooth CRUD operations.
- 🎨 **Professional UI/UX** – Built with React, Tailwind CSS, and Framer Motion for a clean, interactive experience.

---

## Tech Stack

### Frontend
- **React** + React Router
- **Tailwind CSS** + DaisyUI (components)
- **Framer Motion** (animations)
- **TanStack Query** (server state / caching)
- **Axios** (API requests, secure interceptor)
- **Firebase Auth** (Email/Password + Google)
- **React Toastify** (notifications)
- **Recharts** (dashboard charts)

### Backend
- **Node.js** + **Express**
- **MongoDB Atlas** (Database)
- **Firebase Admin** (token verification; using base64 service key)
- Modular architecture: `config/`, `middlewares/`, `modules/`, `utils/`

---

## 🔧 Installation & Setup

### Go step by step  
```bash
git clone
cd krishilink-frontend
npm install

Create a .env.local file and add your Firebase + Backend credentials:
- VITE_api_url=<YOUR_BACKEND_URL>
- VITE_api_key=<FIREBASE_API_KEY>
- VITE_auth_domain=<FIREBASE_AUTH_DOMAIN>
- VITE_project_id=<FIREBASE_PROJECT_ID>
- VITE_storage_bucket=<FIREBASE_STORAGE_BUCKET>
- VITE_messaging_sender_id=<FIREBASE_SENDER_ID>
- VITE_app_id=<FIREBASE_APP_ID>

npm run dev
