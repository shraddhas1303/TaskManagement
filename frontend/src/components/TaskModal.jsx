import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

function TaskModal({ open, handleClose, handleSave, task }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        completed: false,
      });
    }
  }, [task, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "completed" ? value === "true" : value,
    });
  };

  const submitHandler = () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    handleSave(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <TextField
          select
          margin="dense"
          fullWidth
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>

        <TextField
          select
          margin="dense"
          fullWidth
          label="Status"
          name="completed"
          value={String(formData.completed)}
          onChange={handleChange}
        >
          <MenuItem value="false">Pending</MenuItem>
          <MenuItem value="true">Completed</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={submitHandler}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskModal;