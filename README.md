# 🎨 Mahragan Elkraza Voting App

## 📋 Overview

The **Mahragan Elkraza Voting App** is a modern, full-stack web application designed to facilitate the organization and presentation of artistic works submitted during church festivals. The platform allows visitors to view a public gallery of artworks, vote for their favorite piece (one vote per user), and leave comments. Administrators have access to a dashboard for managing artworks, users, and viewing analytics. The application is secure, responsive, and optimized for both desktop and mobile devices.

تطبيق **التصويت لمهرجان الكرازة** هو تطبيق ويب حديث متكامل مصمم لتسهيل تنظيم وعرض الأعمال الفنية المقدمة خلال المهرجانات الكنسية. يتيح التطبيق للزوار عرض معرض عام للأعمال الفنية والتصويت لقطعتهم المفضلة (صوت واحد لكل مستخدم) وترك التعليقات. يمكن للمسؤولين الوصول إلى لوحة تحكم لإدارة الأعمال الفنية والمستخدمين وعرض التحليلات. التطبيق آمن ومتجاوب ومحسن لكل من أجهزة الكمبيوتر المكتبية والأجهزة المحمولة.

---

## 🎯 Project Objectives

The primary objectives of the Mahragan Elkraza Voting App are:

1. 🖼️ Display all submitted artworks in an accessible and visually appealing public gallery.
2. 🔒 Enable a secure, one-time voting system for users.
3. ❤️ Allow users to add loves reaction on artworks to foster engagement.
4. 📊 Provide an admin dashboard for managing artworks, users, and viewing statistics.
5. 🔐 Ensure secure user authentication and role-based access control.
6. 📱 Deliver a responsive and beautiful user interface with dark mode support and smooth animations.
7. ⚡ Optimize the application for performance and scalability.

الأهداف الرئيسية لتطبيق التصويت لمهرجان الكرازة هي:

١. 🖼️ عرض جميع الأعمال الفنية المقدمة في معرض عام يسهل الوصول إليه وجذاب بصرياً.
٢. 🔒 تمكين نظام تصويت آمن لمرة واحدة للمستخدمين.
٣. ❤️ السماح للمستخدمين بإضافة تفاعلات الإعجاب على الأعمال الفنية لتعزيز المشاركة.
٤. 📊 توفير لوحة تحكم للمسؤول لإدارة الأعمال الفنية والمستخدمين وعرض الإحصائيات.
٥. 🔐 ضمان مصادقة آمنة للمستخدم والتحكم في الوصول على أساس الأدوار.
٦. 📱 تقديم واجهة مستخدم متجاوبة وجميلة مع دعم الوضع المظلم والرسوم المتحركة السلسة.
٧. ⚡ تحسين التطبيق للأداء وقابلية التوسع.

--

## ✨ Features

### 1. 🖼️ Public Artwork Gallery

Displays all submitted artworks with details such as title, image, author, and optional video.
يعرض جميع الأعمال الفنية المرسلة مع تفاصيل مثل العنوان والصورة والمؤلف والفيديو الاختياري.

### 2. 🗳️ Voting System

Allows registered users to cast one vote per artwork, tracked via user ID or session.
تمكين المستخدمين المسجلين من التصويت مرة واحدة لكل أعمال، متتبعة عبر معرف المستخدم أو الجلسة.

### 3. ❤️ Loves System

Allows users to add loves reaction on artworks to foster engagement.
السماح للمستخدمين بإضافة تفاعلات الإعجاب على الأعمال الفنية لتعزيز المشاركة.

### 4. 🔐 Secure Authentication

Implements user login and registration using NextAuth.js with JWT and credentials-based authentication.
تطبيق المصادقة المستخدمية يقوم بتسجيل الدخول وتسجيل المستخدمين باستخدام NextAuth.js مع مصادقة مبتكرة برمز JWT وبيانات اعتمادية.

### 5. 👨‍💼 Admin Dashboard

Provides administrators with tools to manage artworks, users, and view voting statistics.
يوفر لوحة تحكم للمسؤولين الأدوات لإدارة الأعمال الفنية والمستخدمين وعرض الإحصائيات.

### 6. 📱 Responsive Design

Supports both desktop and mobile devices with Tailwind CSS and ShadCN UI.
يمتلك التطبيق دعمًا متجاوبًا ومتجاوبًا مع Tailwind CSS و ShadCN UI.

### 7. 🌙 Dark Mode

Offers a dark theme for better user experience in low-light environments.
يوفر التطبيق وضعًا مظلمًا للتحكم في تجربة المستخدم في بيئة الضوء المنخفض.

### 8. ✨ Animations

Utilizes Framer Motion for smooth and engaging UI transitions.
يستخدم Framer Motion للرسوم المتحركة السلسة وممتعة للتفاعل مع واجهة المستخدم.

### 9. 💾 Data Management

Uses PostgreSQL with Prisma ORM for efficient data storage and retrieval.
يستخدم PostgreSQL مع Prisma ORM لخزن البيانات بكفاءة وتعطيل الوصول إليها.

---

## 📝 Scope of Work

### ✅ In Scope

- 🔐 User authentication and role-based access (Admin, User, Customer).
  مصادقة المستخدم والوصول القائم على الأدوار (المسؤول والمستخدم والعميل).

- 🖼️ Artwork submission and display in a public gallery.
  تقديم وعرض الأعمال الفنية في معرض عام.

- 🗳️ One-time voting system per user.
  نظام تصويت لمرة واحدة لكل مستخدم.

- ❤️ Loves system for artworks.
  نظام الإعجابات للأعمال الفنية.

- 📊 Admin dashboard for managing artworks, users, and viewing analytics.
  لوحة تحكم المسؤول لإدارة الأعمال الفنية والمستخدمين وعرض التحليلات.

- 💾 PostgreSQL database with Prisma ORM for data management.
  قاعدة بيانات PostgreSQL مع Prisma ORM لإدارة البيانات.

- ⚛️ Next.js frontend with Tailwind CSS and ShadCN UI for styling.
  واجهة أمامية Next.js مع Tailwind CSS و ShadCN UI للتصميم.

- 🚀 Deployment to Vercel for hosting.
  النشر على Vercel للاستضافة.

### ❌ Out of Scope (Phase 1)

- 📤 Direct artwork uploading by users
- 🛡️ Content moderation system
- 🔔 Push notifications for user actions

---

## 👥 Target Users

| User Role       | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| 👨‍💼 Admin        | Can manage artworks, users, and view analytics such as vote counts and user activity   |
| 👤 User         | Can register, log in, vote once per artwork, comment on artworks, and view the gallery |
| 👁️ Customer     | Can view the artwork gallery but cannot vote or comment without registering.           |
| --------------- | -------------------------------------------------------------------------------------- |

| دور المستخدم    | الوصف                                                                                  |
| --------------- | -------------------------------------------------------------------------------------- |
| 👨‍💼 المسؤول      | يمكنه إدارة الأعمال الفنية والمستخدمين وعرض التحليلات مثل عدد الأصوات ونشاط المستخدم   |
| 👤 المستخدم     | يمكنه التسجيل وتسجيل الدخول والتصويت مرة واحدة لكل عمل فني والتعليق وعرض المعرض        |
| 👁️ الزائر       | يمكنه عرض معرض الأعمال الفنية ولكن لا يمكنه التصويت أو التعليق بدون تسجيل              |
| --------------- | -------------------------------------------------------------------------------------- |

## 🛠️ Tech Stack

| Layer        | Technology                                 |
| ------------ | ------------------------------------------ |
| Frontend     | ⚛️ Next.js latest (App Router), TypeScript |
| UI Framework | 🎨 Tailwind CSS, ShadCN UI                 |
| Animations   | ✨ Framer Motion                           |
| Auth         | 🔐 NextAuth.js (JWT + Credentials)         |
| Database     | 💾 PostgreSQL + Prisma ORM                 |
| Deployment   | 🚀 Vercel (Recommended)                    |

---

### 📱 Pages

1- **🏠 splash screen:** A welcoming landing page for users, introducing the app and guiding them to the gallery
2- **🖼️ arts view like facebook:** A Facebook-like view displaying all artworks with voting and commenting functionality.
3- **🔑 login page and register:** Secure authentication pages for user registration and login.
4- **📊 Admin Dashboard:** A dedicated interface for admins to add new artworks, manage users, and view voting statistics.
5- **🗳️ Vote Page:** A separate page for users to vote on artworks.

### 📋 Functional Requirements

| Feature                        | Description                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **🔑 User Registration/Login** | Secure authentication using NextAuth.js with credentials and JWT.                |
| **👥 Role Management**         | Assign roles (Admin, User, Customer) via database seeding or admin panel         |
| **🖼️ Artwork Gallery**         | Display artworks with title, image, author, and optional video                   |
| **🗳️ Voting System**           | Allow one vote per user per artwork, tracked by user ID or session.              |
| **❤️ Loves System**            | Enable users to add and view loves on each artwork.                              |
| **📊 Admin Dashboard**         | Interface for managing artworks, users, and viewing vote analytics               |
| **📱 Responsive UI**           | Fully responsive design using Tailwind CSS and ShadCN UI for all devices         |
| -------------------------      | -------------------------------------------------------------------------------- |

### 💾 Database Schema

The database is managed using PostgreSQL with Prisma ORM. The main models include:

- 👤 User: Stores user information (ID, username, email, password hash, role).
- 🔖 Role: Defines user roles (Admin, User, Customer).
- 🖼️ Artwork: Stores artwork details (ID, title, image URL, author, optional video URL, creation date).
- 🗳️ Vote: Tracks user votes (user ID, artwork ID, timestamp).
- 📅 Event: Stores event details (ID, title, start_date, end_date, artwroks, year, description).
- ❤️ Love: Tracks user loves (user ID, artwork ID, timestamp).

### ⏱️ Implementation Timeline

| Phase                              | Notes                                    |
| ---------------------------------- | ---------------------------------------- |
| **🚀 Project setup & scaffolding** | Init repo, install all packages needed   |
| **🔐 Auth + Role system**          | Setup login, roles, session logic        |
| **💾 Database models**             | User, Role, Artwork, Vote, Loves         |
| **🖼️ Artwork gallery UI**          | Build gallery with voting functionality  |
| **❤️ Love system**                 | Add + display loves                      |
| **📊 Admin dashboard**             | Stats, management views                  |
| **🎨 Responsive styling + polish** | Tailwind, animations, dark mode          |
| **🧪 Testing & deployment**        | Local test + deploy to Vercel            |
| -----------------------------      | ---------------------------------------- |

### 🛠️ Setup Instructions

#### 📋 Prerequisites

- 📦 Node.js (v18 or later)
- 📦 npm or yarn
- 💾 PostgreSQL database (v14 or higher)
- 🚀 Vercel account for deployment
- 📂 Git for version control
- 🗄️ Prisma ORM

#### 📥 Installation

1. **📂 Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/church-portal.git
   cd church-portal
   ```

2. **📦 Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **⚙️ Set Up Environment Variables:** Create a .env file in the project root and add the following:

   ```env
    DATABASE_URL= "your.postgres.link"
    NEXTAUTH_SECRET="your-nextauth-secret"
    SMTP_HOST=your.stmp.host
    SMTP_PORT=587
    SMTP_USER=your.gmail.account
    SMTP_PASS=your.app.password
    CLOUDINARY_CLOUD_NAME=your.cloudanry.username
    CLOUDINARY_API_KEY=your.cloudanry.key
    CLOUDINARY_API_SECRET=your.cloudanry.secret.key
   ```

   Replace `username`, `password`, and `your-nextauth-secret` with your actual database credentials and a secure secret for NextAuth.js.

4. **💾 Set Up PostgreSQL**

   - Create a PostgreSQL database.
   - Update the DATABASE_URL in the .env file with your database credentials.

   ```bash
   npx prisma migrate dev
   ```

5. **🚀 Start the Development Server:**

```bash
   npm run dev
```

#### 🚀 Deployment

1. **📤 Push to GitHub**:
   Ensure all changes are committed and pushed to the GitHub repository.

2. **🌐 Deploy to Vercel**:
   - Connect the repository to Vercel via the Vercel dashboard.
   - Configure environment variables in Vercel (same as `.env`).
   - Deploy the app, and Vercel will provide a live URL.

### 📖 Usage Guidelines

#### 👤 For Users

1. **🔑 Register/Login**: Create an account or log in via the login page.
2. **🖼️ Browse Gallery**: View all artworks in the gallery, including titles, images, and videos.
3. **🗳️ Vote**: Cast one vote per artwork by clicking the vote button (available only for logged-in users).
4. **❤️ Love**: Add loves to artworks to show appreciation.

#### 👨‍💼 For Admins

1. **🔑 Access Dashboard**: Log in with admin credentials to access the dashboard.
2. **🖼️ Manage Artworks**: Add, edit, or delete artworks.
3. **📊 View Analytics**: Monitor vote counts and user activity.
4. **👥 Manage Users**: Assign roles or remove users as needed.

#### 🧪 Testing

- **🧪 Local Testing**: Run `npm run test` to execute unit and integration tests (if implemented).
- **👆 Manual Testing**:
  - Test user registration, login, and role-based access.
  - Verify one-time voting functionality.
  - Ensure comments are saved and displayed correctly.
  - Check admin dashboard functionality and analytics.
  - Test responsiveness on mobile and desktop devices.

#### 🚀 Future Enhancements

- **📤 User Artwork Upload**: Allow users to submit artworks directly.
- **🛡️ Moderation System**: Implement content moderation for comments and artworks.
- **🔔 Push Notifications**: Notify users of new artworks or comments.
- **📈 Advanced Analytics**: Provide detailed insights for admins, such as voting trends.

---

## 📞 Contact

For support or inquiries, contact the project maintainer via GitHub issues: [pepoo202020/Mahragan-Elkraza-voting-app](https://github.com/pepoo202020/Mahragan-Elkraza-voting-app).

---

### 📅 Last Updated: September 2, 2025

🔄 Version: 1.0.0
