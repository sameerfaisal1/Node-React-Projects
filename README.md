# 🎓 Student Management System

A full-stack CRUD app built with **React + Tailwind CSS** (frontend) and **Node.js + Express + MySQL** (backend).

---

## 📁 Project Structure

```
student-management-system/
├── backend/                  ← Node.js + Express API
│   ├── config/
│   │   └── db.js             ← MySQL database connection
│   ├── controllers/
│   │   └── studentController.js  ← Request/Response logic
│   ├── models/
│   │   └── Student.js        ← All SQL queries
│   ├── routes/
│   │   └── studentRoutes.js  ← API URL definitions
│   ├── database.sql          ← Run this to set up MySQL
│   ├── .env                  ← Your DB credentials
│   └── server.js             ← App entry point
│
└── frontend/                 ← React + Tailwind app
    └── src/
        ├── components/
        │   ├── Navbar.jsx        ← Top navigation
        │   ├── StudentCard.jsx   ← Single student card
        │   └── StudentForm.jsx   ← Add / Edit modal form
        ├── pages/
        │   └── StudentsPage.jsx  ← Main page (CRUD logic)
        ├── services/
        │   └── studentService.js ← All API calls (axios)
        ├── App.jsx
        └── main.jsx
```

---

## 🚀 How to Run (Step by Step)

### Step 1 — Set up MySQL Database

1. Open **MySQL Workbench** or run in terminal:
   ```bash
   mysql -u root -p
   ```
2. Copy and run everything in `backend/database.sql`
3. This creates the database and sample students

---

### Step 2 — Set up Backend

```bash
cd backend
```

Open `.env` and update your MySQL password:
```
DB_PASSWORD=your_actual_mysql_password
```

Install packages and run:
```bash
npm install
npm run dev
```

✅ Backend runs on: `http://localhost:5000`

---

### Step 3 — Set up Frontend

Open a **new terminal tab**:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs on: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | URL                    | What it does         |
|--------|------------------------|----------------------|
| GET    | /api/students          | Get all students     |
| GET    | /api/students/:id      | Get one student      |
| POST   | /api/students          | Create student       |
| PUT    | /api/students/:id      | Update student       |
| DELETE | /api/students/:id      | Delete student       |

---

## 🏗️ MVC Pattern Explained

| Layer      | File                        | Job                                      |
|------------|-----------------------------|------------------------------------------|
| Model      | `models/Student.js`         | Runs SQL queries, talks to database      |
| View       | React components (frontend) | Shows UI to the user                     |
| Controller | `controllers/studentController.js` | Handles requests, calls Model, sends response |
| Routes     | `routes/studentRoutes.js`   | Maps URLs to controller functions        |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios, React Hot Toast
- **Backend**: Node.js, Express.js, MySQL2
- **Database**: MySQL
