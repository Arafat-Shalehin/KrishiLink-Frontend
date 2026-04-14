<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-12.x-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
</p>

# 🌾 KrishiLink — Frontend

> **A modern, production-ready React application for an agricultural marketplace connecting farmers directly with buyers.**

🔗 **Live Demo:** [https://krishilink-a8922.web.app](https://krishilink-a8922.web.app)  
🔗 **Backend API:** [https://krishi-link-backend.vercel.app](https://krishi-link-backend.vercel.app)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Visual Showcase](#-visual-showcase)
- [Performance & UX](#-performance--ux)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)

---

## 🎯 Overview

**KrishiLink Frontend** is a feature-rich React application that provides an intuitive interface for agricultural trading. The platform implements a sophisticated **role-based access system** with dedicated dashboards and functionalities for Buyers, Farmers, and Administrators.

### Key Highlights:

- **Role-Based UI** — Dynamic interface adapting to user roles (Buyer/Farmer/Admin)
- **Modern React 19** — Latest React features with concurrent rendering
- **Secure Authentication** — Firebase Auth with Email/Password and Google OAuth
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **Optimized Performance** — TanStack Query for intelligent server state caching
- **Smooth Interactions** — Framer Motion powered animations throughout

---

## 📸 Visual Showcase

### 🌐 Public Experience

_The gateway for farmers and buyers to connect._

|                        🏠 Landing Page                         |                         🔍 Advanced Search                         |                       📦 Crop Details(50% ZoomOut)                       |
| :------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![Home Page Placeholder](/KrishiLink-Frontend/public/Home.png) | ![All Crops Placeholder](/KrishiLink-Frontend/public/AllCrops.png) | ![Crop Details Placeholder](/KrishiLink-Frontend/public/CropDetails.png) |

### 🌾 Farmer's Workspace

_Tools for farmers to list crops and manage buyer interests._

|                             📊 Farmer Dashboard                             |                           🤝 Interest Management                           |
| :-------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| ![Farmer Dashboard Placeholder](/KrishiLink-Frontend/public/FarmerDash.png) | ![Farmer Interests Placeholder](/KrishiLink-Frontend/public/FarmerIns.png) |

### 🛒 Buyer's Experience

_Simplified interface for buyers to track their interests and profile._

|                            👤 Buyer Dashboard                             |                             📋 My Interests                              |
| :-----------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![Buyer Dashboard Placeholder](/KrishiLink-Frontend/public/buyerDash.png) | ![Buyer Interests Placeholder](/KrishiLink-Frontend/public/buyerIns.png) |

### 🛡️ Administrative Suite

_Comprehensive control panel for platform moderation and analytics._

|                               📈 Admin Overview                                |                            👥 User Management                             |                             📝 Approval Workflow                             |
| :----------------------------------------------------------------------------: | :-----------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| ![Admin Dashboard Placeholder](/KrishiLink-Frontend/public/AdminDashboard.png) | ![User Management Placeholder](/KrishiLink-Frontend/public/AdminUSer.png) | ![Admin Overview Placeholder](/KrishiLink-Frontend/public/AdminOver.png.png) |

---

## ⚡ Performance & UX

| Feature                        | Implementation            | Benefit                              |
| :----------------------------- | :------------------------ | :----------------------------------- |
| **Search Engine Optimization** | Meta tags & Semantic HTML | High visibility on Google/Bing       |
| **Responsive Design**          | Mobile-First Approach     | Seamless experience on all devices   |
| **Theme System**               | Dark/Light Mode           | Reduced eye strain & personalization |
| **Micro-Interactions**         | Framer Motion             | Fluid, high-end application feel     |

---

---

## 🛠 Tech Stack

### Core Technologies

| Category             | Technology     | Version | Purpose                                 |
| -------------------- | -------------- | ------- | --------------------------------------- |
| **UI Library**       | React          | 19.x    | Component-based user interface          |
| **Build Tool**       | Vite           | 7.x     | Lightning-fast development & builds     |
| **Routing**          | React Router   | 7.x     | Client-side routing with nested layouts |
| **State Management** | TanStack Query | 5.x     | Server state, caching & synchronization |
| **HTTP Client**      | Axios          | 1.x     | API requests with interceptors          |

### Styling & UI

| Technology         | Purpose                        |
| ------------------ | ------------------------------ |
| **Tailwind CSS 4** | Utility-first CSS framework    |
| **DaisyUI 5**      | Component library for Tailwind |
| **Framer Motion**  | Production-ready animations    |
| **Lucide React**   | Modern icon library            |
| **React Icons**    | Additional icon sets           |

### Authentication & Backend

| Technology                | Purpose                            |
| ------------------------- | ---------------------------------- |
| **Firebase Auth**         | User authentication (Email/Google) |
| **Firebase Hosting**      | Static site deployment             |
| **Custom Axios Instance** | JWT interceptor & token refresh    |

### Additional Libraries

| Library                   | Purpose                      |
| ------------------------- | ---------------------------- |
| **Recharts**              | Dashboard analytics charts   |
| **Swiper**                | Touch-enabled carousels      |
| **React Toastify**        | Toast notifications          |
| **SweetAlert2**           | Beautiful alert dialogs      |
| **clsx + tailwind-merge** | Conditional class management |

---

## ✨ Features

### 🔐 Authentication System

- Email/Password registration and login
- Google OAuth integration
- Persistent sessions with Firebase
- Protected routes with role validation
- Automatic token injection via Axios interceptors

### 🏠 Public Pages

- **Home Page** — Hero section, latest crops, how it works, partnerships
- **All Crops** — Advanced filtering, search, and pagination
- **Crop Details** — Comprehensive crop information with interest submission
- **About Page** — Platform mission and team information
- **Agro News** — Agricultural news and updates

### 👤 User Roles & Permissions

#### 🛒 Buyer Dashboard

- View personalized dashboard with statistics
- Browse and filter crop listings
- Submit purchase interests on crops
- Track interest status (Pending/Accepted/Rejected)
- Request upgrade to Farmer role

#### 🌾 Farmer Dashboard

- Comprehensive crop management (CRUD)
- Add new crop listings with detailed information
- View received interests on crops
- Accept or reject buyer interests
- Dashboard with crop performance analytics

#### 🛡️ Admin Panel

- Platform-wide overview and statistics
- User management (view, activate/deactivate, role change)
- Farmer role request approval workflow
- Crop moderation and content management
- Analytics with visual charts

### 🎨 UI/UX Features

- **Dark/Light Theme** — System-aware theme with manual toggle
- **Skeleton Loaders** — Polished loading states throughout
- **Responsive Design** — Seamless experience from mobile to desktop
- **Micro-interactions** — Subtle animations for better UX
- **Toast Notifications** — Real-time feedback for all actions

---

## 🏗 Architecture

### Application Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        ENTRY POINT                              │
│                         main.jsx                                │
│    ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐   │
│    │ AuthProvider │ │ThemeProvider │ │ QueryClientProvider  │   │
│    └──────────────┘ └──────────────┘ └──────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROUTER (React Router 7)                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                      Routes.jsx                         │    │
│  │  ┌──────────┐  ┌─────────────┐  ┌─────────────────┐     │    │
│  │  │ HomeLayOut│  │ AuthLayout │  │ DashboardLayout │     │    │
│  │  └──────────┘  └─────────────┘  └─────────────────┘     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ROUTE PROTECTION                             │
│  ┌───────────────────┐         ┌─────────────────────────────┐  │
│  │   PrivateRoute    │    →    │        RoleRoute            │  │
│  │ (Auth Required)   │         │ (Role-Based Access Control) │  │
│  └───────────────────┘         └─────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PAGE COMPONENTS                            │
│    ┌─────────────────────────────────────────────────────┐      │
│    │                  DASHBOARDS                         │      │
│    │  ┌───────────┐  ┌──────────────┐  ┌─────────────┐   │      │
│    │  │   Buyer   │  │    Farmer    │  │    Admin    │   │      │
│    │  └───────────┘  └──────────────┘  └─────────────┘   │      │
│    └─────────────────────────────────────────────────────┘      │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA LAYER                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                Custom Hooks (TanStack Query)            │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────────────┐    │    │
│  │  │useCrops   │  │useInterests│ │useAdminOverview  │    │    │
│  │  └───────────┘  └───────────┘  └───────────────────┘    │    │
│  └─────────────────────────┬───────────────────────────────┘    │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐    │
│  │              useAxiosSecure (Axios Instance)            │    │
│  │         (Auto Token Injection + Error Handling)         │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API                                  │
│              https://krishi-link-backend.vercel.app             │
└─────────────────────────────────────────────────────────────────┘
```

### State Management Strategy

| State Type       | Solution       | Use Case                            |
| ---------------- | -------------- | ----------------------------------- |
| **Server State** | TanStack Query | API data, caching, synchronization  |
| **Auth State**   | React Context  | User session, authentication status |
| **Theme State**  | React Context  | Dark/Light mode preferences         |
| **UI State**     | Local State    | Component-specific interactions     |

---

## 📁 Project Structure

```
KrishiLink-Frontend/
├── public/                       # Static assets
├── src/
│   ├── Assets/                   # Images, fonts, etc.
│   │
│   ├── Components/               # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LatestCrop.jsx
│   │   ├── CropsDetails.jsx
│   │   ├── AgroNews.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── PartnerShips.jsx
│   │   ├── Skeleton/             # Loading state components
│   │   │   └── *.jsx
│   │   └── ui/                   # Primitive UI components
│   │       └── *.jsx
│   │
│   ├── Context/                  # React Context providers
│   │   ├── AuthProvider.jsx      # Authentication context
│   │   └── ThemeProvider.jsx     # Theme management
│   │
│   ├── Dashboard/                # Dashboard components
│   │   ├── DashboardHome.jsx     # Unified dashboard home
│   │   ├── DashboardSidebar.jsx  # Navigation sidebar
│   │   ├── buyer/
│   │   │   ├── BuyerDashboard.jsx
│   │   │   └── BuyerInterests.jsx
│   │   ├── farmer/
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── FarmerCrops.jsx
│   │   │   ├── FarmerAddCrop.jsx
│   │   │   └── FarmerInterests.jsx
│   │   └── admin/
│   │       ├── AdminOverview.jsx
│   │       ├── AdminUsers.jsx
│   │       ├── AdminRequests.jsx
│   │       └── AdminCrops.jsx
│   │
│   ├── Firebase/                 # Firebase configuration
│   │   └── firebase.config.js
│   │
│   ├── Hooks/                    # Custom React hooks
│   │   ├── useAxios.jsx          # Secure Axios instance
│   │   ├── useAuthProfile.jsx    # Auth utilities
│   │   ├── crops/                # Crop-related hooks
│   │   ├── admin/                # Admin-related hooks
│   │   ├── farmer/               # Farmer-related hooks
│   │   └── dashboard/            # Dashboard data hooks
│   │
│   ├── Layouts/                  # Layout components
│   │   ├── HomeLayOut.jsx        # Public pages layout
│   │   ├── AuthLayOut.jsx        # Auth pages layout
│   │   └── DashboardLayout.jsx   # Dashboard layout
│   │
│   ├── Pages/                    # Page components
│   │   ├── About.jsx
│   │   ├── AddCrops.jsx
│   │   ├── AllCropsPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MyInterest.jsx
│   │   ├── MyPostPage.jsx
│   │   ├── MyProfile.jsx
│   │   ├── NewsDetails.jsx
│   │   └── ErrorPage.jsx
│   │
│   ├── Routes/                   # Route definitions
│   │   ├── Routes.jsx            # Main router config
│   │   ├── PrivateRoute.jsx      # Auth protection
│   │   └── RoleRoute.jsx         # Role-based access
│   │
│   ├── Services/                 # API service functions
│   │
│   ├── utils/                    # Utility functions
│   │
│   ├── lib/                      # Third-party configurations
│   │
│   ├── App.jsx                   # Home page component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
│
├── components.json               # shadcn/ui configuration
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint configuration
├── firebase.json                 # Firebase hosting config
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Firebase project with Authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/krishilink-frontend.git
cd krishilink-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

### Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build production bundle           |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Run ESLint for code quality       |

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API URL
VITE_api_url=https://krishi-link-backend.vercel.app

# Firebase Configuration
VITE_api_key=<your_firebase_api_key>
VITE_auth_domain=<your_project>.firebaseapp.com
VITE_project_id=<your_project_id>
VITE_storage_bucket=<your_project>.appspot.com
VITE_messaging_sender_id=<your_sender_id>
VITE_app_id=<your_app_id>
```

> ⚠️ **Important:** Never commit `.env.local` to version control. It's already included in `.gitignore`.

---

## 🌐 Deployment

### Firebase Hosting (Recommended)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (already configured via firebase.json)
firebase init hosting

# Build the production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables in dashboard

---

## 🗺 Roadmap

### Completed ✅

- [x] Core authentication system
- [x] Role-based dashboard architecture
- [x] Crop management for farmers
- [x] Interest system for buyers
- [x] Admin panel with moderation tools
- [x] Responsive design with dark mode
- [x] Skeleton loading states

### In Progress 🚧

- [ ] **SSLCommerz payment integration**
- [ ] Enhanced image upload with preview

### Planned 📋

- [ ] Real-time notifications
- [ ] Chat system between buyers and farmers
- [ ] Advanced search with filters
- [ ] Order tracking system
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Bangla/English)
- [ ] PWA capabilities

---

## 🧪 Code Quality

This project maintains high code quality standards:

- **ESLint** — JavaScript/React linting with recommended rules
- **Consistent Patterns** — Custom hooks for data fetching
- **Component Composition** — Reusable, composable components
- **Separation of Concerns** — Clear distinction between UI and logic

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@Arafat-Shalehin](https://github.com/Arafat-Shalehin)
- LinkedIn: [Arafat Shalehin](https://www.linkedin.com/in/arafat-shalehin/)

---

<p align="center">
  Made with ❤️ for empowering farmers and connecting agricultural communities
</p>
