import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import { FiBarChart } from "react-icons/fi";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { currentUser, assignments, submissions } = useContext(AuthContext);

  const totalAssignments = assignments.length;
  const submissionsReceived = submissions.filter(
    (s) => s.status === "Submitted" || s.status === "Graded"
  ).length;
  const pendingGrading = submissions.filter(
    (s) => s.status === "Submitted" && !s.marks
  ).length;

  const userAssignments = assignments.filter(
    (a) => a.assignedTo === currentUser.id && a.published
  );
  const completedAssignments = submissions.filter(
    (s) => s.studentId === currentUser.id && s.status === "Graded"
  ).length;
  const progressPercentage =
    userAssignments.length > 0
      ? (completedAssignments / userAssignments.length) * 100
      : 0;

  return (
    <div className="dashboard-page">
      {currentUser.role === "admin" && (
        <div className="cards-container">
          <DashboardCard title="Total Assignment" value={totalAssignments} />
          <DashboardCard
            title="Submissions Received"
            value={submissionsReceived}
          />
          <DashboardCard title="Pending Grading" value={pendingGrading} />
        </div>
      )}
      <div
        className="progress-container"
        style={{
          marginTop: "20px",
          backgroundColor: "#ffffff",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          color: "#1e293b",
        }}
      >
        <h2 style={{ color: "#3b82f6" }}>Your Progress</h2>
        <div
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            height: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#3b82f6",
              height: "100%",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
        <p style={{ marginTop: "10px" }}>
          {completedAssignments} out of {userAssignments.length} assignment
          completed ({progressPercentage.toFixed(1)}%)
        </p>
      </div>
      {currentUser.role === "admin" && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#ffffff",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            color: "#1e293b",
          }}
        >
          <h2 style={{ color: "#3b82f6" }}>Stats</h2>
          <p>
            <FiBarChart style={{ marginRight: "8px" }} /> Submission Trends and
            Average Grades (Coming Soon)
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
