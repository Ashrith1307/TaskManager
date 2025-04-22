import React, { useState } from "react";
import { createTask } from "../services/api";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, completed: false };

    const createdTask = await createTask(newTask);
    onAddTask(createdTask); // Pass the created task back to the parent
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
