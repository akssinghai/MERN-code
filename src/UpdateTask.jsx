import React, { useState } from "react";

const UpdateTask = ({ task, onUpdate, onDelete }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  return (
    <div className="update-task">
      <h2>Edit Task</h2>
      <form className="task-form" onSubmit={handleUpdate}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Task</button>
        <button type="button" className="delete-task" onClick={handleDelete}>
          Delete Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
