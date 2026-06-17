# 🚀 Task Management Dashboard

A full-stack Task Management Application built using React, Material UI, Node.js, and Express.js.

## 📌 Features

### Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed or Pending
- Set Priority (High, Medium, Low)

### Dashboard
- Total Tasks Counter
- Completed Tasks Counter
- Pending Tasks Counter

### Search & Filter
- Search tasks by title or description
- Filter tasks by status:
  - All
  - Completed
  - Pending

### User Experience
- Responsive UI
- Material UI Components
- Success Notifications (Snackbar)
- Delete Confirmation
- Pagination Support
- Empty State Handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure

```bash
TaskManager/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskModal.jsx
│   │   │   
│   │   │
│   │   ├── services/
│   │   │   └── taskService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Ankush7058/TaskManager.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 📡 API Endpoints

### Get All Tasks

```http
GET /tasks
```

### Add Task

```http
POST /tasks
```

Request Body:

```json
{
  "title": "Learn React",
  "description": "Practice hooks",
  "priority": "High",
  "completed": false
}
```

### Update Task

```http
PUT /tasks/:id
```

### Delete Task

```http
DELETE /tasks/:id
```

---

## 🌐 Live Demo

### Frontend

https://task-manager-dun-eight-27.vercel.app

### Backend

https://taskmanager-f68y.onrender.com/tasks

---

## 📸 Screenshots

### Dashboard

- Task Statistics
- Search & Filter
- CRUD Operations
- Pagination
- Responsive Design

---

## 👨‍💻 Author

**Ankush Pandit**

GitHub:
https://github.com/Ankush7058

