# Personal Portfolio & Content Management System

A modern, production-ready portfolio platform designed to showcase software engineering projects, technical expertise, and professional milestones.

Built to deliver a fast, responsive, and seamless experience for visitors, paired with a secure administrative dashboard for real-time content management, project showcases, and communication handling.

---

## 🌟 Key Architecture & Capabilities

- **Client-First Public Interface:** High-performance, fully accessible, responsive web application supporting seamless dark/light modes, fine-tuned micro-interactions, and SEO optimization.
- **Dedicated Administrative CMS:** Protected management console providing real-time CRUD operations over portfolio content, status flags, and incoming messages.
- **Unified RESTful Backend:** Cleanly stratified architecture (Controllers, Middleware, Models, Routes, Services, Validators) delivering secure endpoints for both public consumers and the admin dashboard.
- **Database & Data Integrity:** MongoDB schemas with Mongoose models, indexes, and data sanitization.
- **Secure Authentication:** Single-admin JWT authentication delivered via encrypted, HTTP-only cookies with bcrypt password hashing and rate-limited endpoints.
- **Media & Asset Management:** Integrated cloud media delivery using ImageKit for CDN asset delivery and responsive image optimization.
- **Automated Messaging Pipeline:** Real-time email notifications powered by SMTP/Nodemailer with input validation and spam protection.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (Custom Blue `#2563EB` & Slate palette)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **Data Fetching:** TanStack Query & Axios
- **Typography:** Inter

### Backend
- **Runtime:** Node.js (`v24+`)
- **Server:** Express.js with TypeScript
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** JWT with secure HTTP-only cookies, password hashing with bcrypt
- **Security:** Helmet, CORS allowlist, Express Rate Limit, Mongo sanitize
- **Media Management:** ImageKit SDK
- **Email Delivery:** Nodemailer (SMTP)

---

## 📁 Repository Structure

```text
portfolio/
├── frontend/                     # React + TypeScript + Vite frontend
│   └── src/
│       ├── assets/               # Static assets & graphics
│       ├── components/           # Component library
│       │   ├── layout/           # Navbar, Footer, Sidebar, Layout wrappers
│       │   ├── home/             # Hero and intro sections
│       │   ├── about/            # Two-column about section & CV download
│       │   ├── skills/           # Categorized skills presentation
│       │   ├── projects/         # Project showcase & detail modals/cards
│       │   ├── education/        # Chronological education timeline
│       │   ├── services/         # Services offered cards
│       │   ├── contact/          # Clean contact form
│       │   └── ui/               # Reusable buttons, inputs, modals, toasts
│       ├── pages/                # Public and Admin route views
│       ├── layouts/              # Main public & Admin dashboard layouts
│       ├── hooks/                # Custom React hooks
│       ├── services/             # Axios API client integrations
│       ├── context/              # AuthContext, ThemeContext
│       ├── types/                # TypeScript shared interfaces
│       ├── utils/                # Helpers & formatters
│       └── constants/            # Site metadata & navigation links
│
├── backend/                      # Express + TypeScript backend API
│   ├── .env.example              # Environment variables template
│   └── src/
│       ├── config/               # DB, ImageKit, Mailer, and environment config
│       ├── controllers/          # Request handler functions
│       ├── middleware/           # Auth, error handling, validation, rate limiting
│       ├── models/               # Mongoose schemas & indexes
│       ├── routes/               # API route definitions (public & admin)
│       ├── services/             # Business logic & 3rd-party integrations
│       ├── validators/           # Zod / express-validator schemas
│       ├── utils/                # Token generation, password helpers, response utils
│       ├── types/                # Backend TypeScript types
│       ├── app.ts                # Express application setup
│       └── server.ts             # Server entry point & DB connection
│
├── PROJECT_STATUS.md             # Development phase tracker & handoff log
├── README.md                     # Project documentation
└── .gitignore                    # Git ignore rules
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** `v20.x` or `v24.x`
- **npm:** `v10.x` or `v11.x`
- **MongoDB:** Local MongoDB instance or MongoDB Atlas cluster

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Key environment configurations defined in `backend/.env.example`:
- `DATABASE_URL`: Connection string to MongoDB.
- `JWT_SECRET`: Secret key for signing admin authentication tokens.
- `COOKIE_SECRET`: Secret key for secure cookie signing.
- `IMAGEKIT_*`: Credentials for ImageKit media uploads.
- `SMTP_*`: SMTP email settings for contact message notifications.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Security Principles
- **Protected Backend Routes:** Strict authentication middleware; never relies solely on frontend route guards.
- **Secure Cookies:** HTTP-only, SameSite configured, HTTPS secure cookies in production.
- **Zero Secrets in Git:** Strict `.gitignore` policy and environment variable configuration.
- **Rate Limiting & Spam Protection:** Protection on message submissions and authentication routes against brute-force attacks.

---

## 📋 Project Status & Roadmap
All real-time development phases, active tasks, verification records, and handoffs are tracked in **[PROJECT_STATUS.md](./PROJECT_STATUS.md)**.

---

## 📄 License
Private & Personal Portfolio Application — All rights reserved.
