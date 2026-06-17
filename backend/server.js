const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const tasksFilePath = path.join(__dirname, "data", "tasks.json");

const readTasks = () => {
  try {
    const data = fs.readFileSync(tasksFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

app.get("/", (req, res) => {
  res.send("Task Management API is running");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    description: description || "",
    completed: completed || false,
    priority: priority || "Medium",
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
  };

  writeTasks(tasks);

  res.json(tasks[taskIndex]);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();

  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const updatedTasks = tasks.filter((task) => task.id !== id);

  writeTasks(updatedTasks);

  res.json({
    message: "Task deleted successfully",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});