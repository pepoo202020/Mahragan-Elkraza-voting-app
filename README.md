# 🎨 Church Artwork Voting App

A modern full-stack web application to help church servants organize and present artistic works submitted during church festivals. Visitors can view artworks, vote for their favorite, and leave comments — all within a secure and engaging platform.

---

## Project Objectives

- Display all submitted artworks in a public gallery
- Enable one-time voting per user
- Allow users to add comments on artworks
- Provide an admin dashboard for managing artworks and viewing stats
- Ensure secure user authentication and role-based access
- Offer responsive and beautiful UI compatible with both desktop and mobile

## ✨ Features

- 🖼️ Public gallery of submitted artworks
- 🗳️ Voting system (one vote per user)
- 💬 Comments on each artwork
- 🔐 Secure authentication (NextAuth.js)
- 🧑‍💼 Admin dashboard to manage artworks and users
- 🌙 Responsive + dark mode UI
- 💨 Smooth animations with Framer Motion
- 💾 Data powered by PostgreSQL & Prisma

---

## Scope of Work

### ✅ In Scope

- User authentication and role management (Admin/User)
- Artwork submission and display
- One-time voting system
- Comments system
- Admin dashboard
- PostgreSQL database with Prisma
- Next.js frontend with Tailwind CSS and ShadCN UI
- Deployment to Vercel

### ❌ Out of Scope (Phase 1)

- Artwork uploading from users
- Moderation system
- Push notifications

---

## Target Users

| User Role       | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| Admin           | Can manage artworks, users, view analytics                      |
| User            | Can vote once, comment on artworks, and view the gallery        |
| Customer        | Can Show only artworks                                          |
| --------------- | --------------------------------------------------------------- |

## 🛠️ Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Frontend     | Next.js latest (App Router), TypeScript |
| UI Framework | Tailwind CSS, ShadCN UI                 |
| Animations   | Framer Motion                           |
| Auth         | NextAuth.js (JWT + Credentials)         |
| Database     | PostgreSQL + Prisma ORM                 |
| Deployment   | Vercel (Recommended)                    |

---

### 2. Pages

1- splash screen
2- arts view like facebook
3- login page and register
4- dashboard for admins with add new arts and show votings and more.

### Functional Requirements

| Feature                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| User Registration/Login   | Secure auth using NextAuth.js                                |
| Role Management           | Assign roles via DB seed or admin panel                      |
| Artwork Gallery           | Display artworks with title, image, author, optional vedio   |
| Voting System             | Allow one vote per user; track by ID or session              |
| Comment System            | Add/view comments per artwork                                |
| Admin Dashboard           | View artworks, votes, and manage users                       |
| Responsive UI             | Tailwind + ShadCN; support mobile & desktop                  |
| ------------------------- | ------------------------------------------------------------ |

### Implementation Timeline

| Phase                         | Notes                                    |
| ----------------------------- | ---------------------------------------- |
| Project setup & scaffolding   | Init repo, install all packages needed   |
| Auth + Role system            | Setup login, roles, session logic        |
| Database models               | User, Role, Artwork, Vote, Comment       |
| Artwork gallery UI            | View + vote logic                        |
| Comment system                | Add + display comments                   |
| Admin dashboard               | Stats, management views                  |
| Responsive styling + polish   | Tailwind, animations, dark mode          |
| Testing & deployment          | Local test + deploy to Vercel            |
| ----------------------------- | ---------------------------------------- |
