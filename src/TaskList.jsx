import React, { useState } from "react";
import "./TaskList.css";
import UpdateTask from "./UpdateTask";

const TaskList = ({ tasks, setTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const toggleStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = [];
    }
    acc[task.priority].push(task);
    return acc;
  }, {});

  const priorityColors = {
    high: "#ffcccc",
    medium: "#fff4cc",
    low: "#ccffcc",
  };

  if (selectedTask) {
    return (
      <div className="task-details">
        <h2>Task Details</h2>
        <p>
          <strong>Title:</strong> {selectedTask.title}
        </p>
        <p>
          <strong>Description:</strong> {selectedTask.description}
        </p>
        <p>
          <strong>Due Date:</strong> {selectedTask.dueDate}
        </p>
        <p>
          <strong>Status:</strong> {selectedTask.status}
        </p>
        <button onClick={handleBackToList}>Back to Task List</button>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>All Tasks</h2>
      {Object.keys(groupedTasks).map((priority) => (
        <div
          key={priority}
          style={{
            backgroundColor: priorityColors[priority] || "#f0f0f0",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ textTransform: "capitalize" }}>{priority} Priority</h3>
          <table className="task-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedTasks[priority].map((task) => (
                <tr key={task.id}>
                  <td
                    onClick={() => setSelectedTask(task)}
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      textDecoration: "underline",
                    }}
                  >
                    {task.title}
                  </td>
                  <td>{task.dueDate}</td>
                  <td
                    onClick={() => toggleStatus(task.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {task.status}
                  </td>
                  <td>
                    <button onClick={() => setEditingTask(task)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {editingTask && (
        <UpdateTask
          task={editingTask}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TaskList;
