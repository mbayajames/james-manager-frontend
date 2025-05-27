import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiUpload } from "react-icons/fi";
import "../styles/Pages.css";

const SubmitAssignment = () => {
  const { assignments, submitAssignment, currentUser } =
    useContext(AuthContext);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignment || !content) {
      alert("Please select an assignment and upload a file.");
      return;
    }
    submitAssignment({
      assignmentId: parseInt(selectedAssignment),
      content,
      comments,
    });
    alert("Assignment submitted successfully!");
    setSelectedAssignment("");
    setContent("");
    setComments("");
  };

  return (
    <div className="submit-assignment-page">
      <h2 style={{ color: "#3b82f6" }}>Submit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.target.value)}
        >
          <option value="">Select Assignment</option>
          {assignments
            .filter((a) => a.assignedTo === currentUser.id && a.published)
            .map((assignment) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.title}
              </option>
            ))}
        </select>
        <textarea
          placeholder="Upload file content or description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ minHeight: "100px" }}
        />
        <textarea
          placeholder="Add comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          style={{ minHeight: "50px", marginBottom: "15px" }}
        />
        <button type="submit">
          <FiUpload style={{ marginRight: "5px" }} /> Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitAssignment;
