import { useEffect, useState } from "react";
import {
  Button,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import AddIcon from "@mui/icons-material/Add";
import TaskModal from "./components/TaskModal";

import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSave = async (task) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, task);
      showSnackbar("Task updated successfully");
    } else {
      await addTask(task);
      showSnackbar("Task added successfully");
    }

    fetchTasks();
    setOpen(false);
    setSelectedTask(null);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    await deleteTask(id);
    fetchTasks();
    showSnackbar("Task deleted successfully");
  };

  const handleAddOpen = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.filter((task) => !task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    const title = task.title || "";
    const description = task.description || "";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">
        Task Management Dashboard
      </h1>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Total Tasks</h5>
              <h2>{tasks.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Completed</h5>
              <h2>{completedCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-2">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Pending</h5>
              <h2>{pendingCount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <TextField
            fullWidth
            label="Search Tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <TextField
            select
            fullWidth
            label="Filter Status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </div>

        <div className="col-md-3 mb-2 d-flex justify-content-md-end">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOpen}
          >
            Add Task
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Description
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Priority
              </TableCell>

              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <div className="py-4">
                    <h5>No Tasks Found</h5>
                    <p className="mb-0">
                      Create your first task using the Add Task button.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell
                    sx={{
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      color: task.completed ? "gray" : "black",
                      fontWeight: 600,
                    }}
                  >
                    {task.title}
                  </TableCell>

                  <TableCell
                    sx={{
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      color: task.completed ? "gray" : "black",
                    }}
                  >
                    {task.description}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.completed ? "Completed" : "Pending"}
                      color={task.completed ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={
                        task.priority === "High"
                          ? "error"
                          : task.priority === "Medium"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredTasks.length > 0 && (
        <>
          <div className="text-center mt-3">
            Showing {paginatedTasks.length} of {filteredTasks.length} tasks
          </div>

          <div className="d-flex justify-content-center mt-3">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </div>
        </>
      )}

      <TaskModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedTask(null);
        }}
        handleSave={handleSave}
        task={selectedTask}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;