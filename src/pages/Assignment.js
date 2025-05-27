import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import "../styles/Pages.css";

const Assignment = () => {
  const {
    currentUser,
    assignments,
    editAssignment,
    deleteAssignment,
    publishAssignment,
  } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="assignment-page">
      <h2 style={{ color: "#3b82f6" }}>Assignment</h2>
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          placeholder="Search assignment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: "40px" }}
        />
        <FiSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#3b82f6",
          }}
        />
      </div>
      <ul>
        {filteredAssignments.map((assignment) => (
          <li
            key={assignment.id}
            style={{
              backgroundColor: "#ffffff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              color: "#1e293b",
            }}
          >
            <strong>{assignment.title}</strong> - Due: {assignment.dueDate}{" "}
            {assignment.published ? "(Published)" : "(Draft)"}
            {currentUser.role === "admin" && (
              <div>
                <button
                  onClick={() =>
                    editAssignment(assignment.id, {
                      title: prompt("New title:", assignment.title),
                    })
                  }
                >
                  <FiEdit style={{ marginRight: "5px" }} /> Edit
                </button>
                <button
                  onClick={() => deleteAssignment(assignment.id)}
                  style={{ marginLeft: "10px" }}
                >
                  <FiTrash2 style={{ marginRight: "5px" }} /> Delete
                </button>
                {!assignment.published && (
                  <button
                    onClick={() => publishAssignment(assignment.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Publish
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {currentUser.role === "admin" && (
        <button onClick={() => navigate("/create-assignment")}>
          Create New Assignment
        </button>
      )}
    </div>
  );
};

export default Assignment;
