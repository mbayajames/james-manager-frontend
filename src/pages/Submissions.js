import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiDownload } from "react-icons/fi";
import "../styles/Pages.css";

const Submissions = () => {
  const { submissions, markSubmission } = useContext(AuthContext);
  const [marks, setMarks] = useState({});
  const [results, setResults] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleMark = (submission) => {
    const submissionMarks = marks[submission.id] || "";
    const submissionResult = results[submission.id] || "";
    const submissionFeedback = feedback[submission.id] || "";
    if (!submissionMarks || !submissionResult) {
      alert("Please enter marks and result.");
      return;
    }
    markSubmission(
      submission.id,
      parseInt(submissionMarks),
      submissionResult,
      submissionFeedback
    );
    alert("Submission marked!");
  };

  return (
    <div className="submissions-page">
      <h2 style={{ color: "#3b82f6" }}>Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li
            key={submission.id}
            style={{
              backgroundColor: "#ffffff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              color: "#1e293b",
            }}
          >
            Assignment {submission.assignmentId} by Student{" "}
            {submission.studentId} - Status: {submission.status}
            {submission.status === "Graded" && (
              <span>
                {" "}
                - Marks: {submission.marks}, Result: {submission.result},
                Feedback: {submission.feedback}
              </span>
            )}
            {submission.status !== "Graded" && (
              <>
                <input
                  type="number"
                  placeholder="Marks"
                  value={marks[submission.id] || ""}
                  onChange={(e) =>
                    setMarks({ ...marks, [submission.id]: e.target.value })
                  }
                  style={{ marginLeft: "10px" }}
                />
                <select
                  value={results[submission.id] || ""}
                  onChange={(e) =>
                    setResults({ ...results, [submission.id]: e.target.value })
                  }
                  style={{ marginLeft: "5px" }}
                >
                  <option value="">Select Result</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
                <textarea
                  placeholder="Feedback"
                  value={feedback[submission.id] || ""}
                  onChange={(e) =>
                    setFeedback({
                      ...feedback,
                      [submission.id]: e.target.value,
                    })
                  }
                  style={{ marginLeft: "5px", width: "200px", height: "50px" }}
                />
                <button
                  onClick={() => handleMark(submission)}
                  style={{ marginLeft: "5px" }}
                >
                  Mark
                </button>
                <button style={{ marginLeft: "5px" }}>
                  <FiDownload /> Download
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Submissions;
