# 🔐 Auth Core – Role & Permission Management System

**Auth Core** is a modern and scalable **Role and Permission Management System** built using the MERN stack with TypeScript, TailwindCSS, and Shadcn UI. It allows administrators to create and manage users, roles, and permissions with real-time access control, while providing a clean, role-based experience for users.

---

## 🚀 Tech Stack

- **Frontend:** React.js + TypeScript + TailwindCSS + Shadcn UI
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based login
- **State Management:** React Context API
- **HTTP Client:** Axios

---

## 👤 Admin Seeding (Initial Setup)

**To get started with the admin panel, you'll first need to create an admin user.**

### 🧪 Option 1: Using Seeder Script

**This project includes a ready-to-use seeder script in the project. This will create a default admin user in your database.**
**📦 Run This Command from backend/:**

```bash
npm run seed

```

**👨‍💼 Default Admin Credentials:**

```bash
Email: admin@admin.com
Password: admin

```

## 📦 Features

### 👨‍💼 Admin Panel

- Secure admin login
- Create, view, and delete permissions
- Create, view, and delete roles
- Assign/remove permissions from roles
- Create, view, and delete users
- Assign/remove roles from users
- Dynamic sidebar with admin-only tools

### 👤 User Panel

- Secure user login
- View assigned roles
- View assigned permissions as clickable sidebar menu
- Access common placeholder page for each permission

---

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auth-core.git
cd auth-core
```

### 2. Install Dependencies

**Backend**

```bash
cd backend
npm install

```

**Frontend**

```bash
cd frontend
npm install

```

### 3. Configure Environment Variables

**.env in backend/**

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

### 4. 💻 Run the Project

**Start Backend Server**

```bash
cd backend
npm run dev

```

**Start Frontend (Vite + React)**

```bash
cd frontend
npm run dev

```

## ✅ Completion Note

**Project completed as part of Company assignment**
