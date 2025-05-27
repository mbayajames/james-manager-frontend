import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiPlus } from "react-icons/fi";
import "../styles/Pages.css";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");
  const { createAssignment, users } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !assignedTo) {
      setError("All fields are required.");
      return;
    }
    createAssignment({
      title,
      description,
      dueDate,
      published: false,
      assignedTo: parseInt(assignedTo),
    });
    setError("");
    alert(
      "Assignment created successfully! Publish it from the Assignments page."
    );
    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignedTo("");
  };

  return (
    <div className="create-assignment-page">
      <h2 style={{ color: "#3b82f6" }}>Create Assignment</h2>
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ minHeight: "100px" }}
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Student</option>
          {users
            .filter((user) => user.role === "student")
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </select>
        <button type="submit">
          <FiPlus style={{ marginRight: "5px" }} /> Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
