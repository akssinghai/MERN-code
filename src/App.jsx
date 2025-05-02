import React, { useState } from "react";
import "./App.css";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";

const App = () => {
  const [task, setTask] = useState({
    id: Date.now(),
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "pending",
  });
  const [tasks, setTasks] = useState([]);
  const [showTaskList, setShowTaskList] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
    setTask({
      id: Date.now(),
      title: "",
      description: "",
      dueDate: "",
      priority: "low",
      status: "pending",
    });
  };

  const toggleTaskList = () => {
    setShowTaskList((prev) => !prev);
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  const closeDetails = () => {
    setSelectedTask(null);
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {!selectedTask ? (
        <>
          <form className="task-form" onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Priority:
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <button type="submit">Add Task</button>
          </form>

          <button className="toggle-task-list" onClick={toggleTaskList}>
            {showTaskList ? "Hide Task List" : "Show Task List"}
          </button>

          {showTaskList && (
            <TaskList
              tasks={tasks}
              setTasks={setTasks}
              onViewDetails={handleViewDetails}
            />
          )}
        </>
      ) : (
        <TaskDetails task={selectedTask} onBack={closeDetails} />
      )}
    </div>
  );
};

export default App;
