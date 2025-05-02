import React from "react";
import "./TaskDetails.css";
const TaskDetails = ({ task, onBack }) => {
  if (!task) {
    return <div>Task not found!</div>;
  }

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <button onClick={onBack}>Back to Task List</button>
    </div>
  );
};

export default TaskDetails;
