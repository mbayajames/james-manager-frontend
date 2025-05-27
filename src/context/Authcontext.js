import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Math Homework", description: "Solve problems", dueDate: "2025-05-30", published: true, createdBy: 1, assignedTo: 2 },
    { id: 2, title: "Science Project", description: "Build a model", dueDate: "2025-06-01", published: true, createdBy: 1, assignedTo: 3 },
  ]);
  const [submissions, setSubmissions] = useState([
    { id: 1, assignmentId: 1, studentId: 2, content: "Math answers", status: "Submitted", marks: null, result: null, feedback: "" },
  ]);
  const [users, setUsers] = useState([
    { id: 1, username: "admin", password: "admin123", role: "admin", profile: { email: "admin@edutask.com" } },
    { id: 2, username: "student1", password: "pass123", role: "student", profile: { email: "student1@edutask.com" } },
    { id: 3, username: "student2", password: "pass123", role: "student", profile: { email: "student2@edutask.com" } },
  ]);
  const [notifications, setNotifications] = useState([]);

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const createAssignment = (assignment) => {
    const newAssignment = { id: assignments.length + 1, ...assignment, createdBy: currentUser.id };
    setAssignments([...assignments, newAssignment]);
    if (!newAssignment.published) {
      setNotifications([...notifications, { id: notifications.length + 1, message: `New draft assignment: ${newAssignment.title}`, read: false }]);
    }
  };

  const editAssignment = (id, updatedAssignment) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...updatedAssignment } : a));
    setNotifications([...notifications, { id: notifications.length + 1, message: `Assignment ${id} updated`, read: false }]);
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
    setSubmissions(submissions.filter(s => s.assignmentId !== id));
    setNotifications([...notifications, { id: notifications.length + 1, message: `Assignment ${id} deleted`, read: false }]);
  };

  const publishAssignment = (id) => {
    const assignment = assignments.find(a => a.id === id);
    setAssignments(assignments.map(a => a.id === id ? { ...a, published: true } : a));
    setNotifications([...notifications, { id: notifications.length + 1, message: `Assignment published: ${assignment.title}`, read: false }]);
  };

  const submitAssignment = (submission) => {
    const newSubmission = { id: submissions.length + 1, ...submission, studentId: currentUser.id, status: "Submitted" };
    setSubmissions([...submissions, newSubmission]);
    setNotifications([...notifications, { id: notifications.length + 1, message: `New submission for Assignment ${newSubmission.assignmentId}`, read: false }]);
  };

  const markSubmission = (submissionId, marks, result, feedback) => {
    const submission = submissions.find(s => s.id === submissionId);
    setSubmissions(submissions.map(s => s.id === submissionId ? { ...s, marks, result, status: "Graded", feedback } : s));
    setNotifications([...notifications, { id: notifications.length + 1, message: `Submission ${submissionId} graded: ${result}`, read: false }]);
  };

  const assignStudentToAssignment = (assignmentId, studentId) => {
    setAssignments(assignments.map(a => a.id === assignmentId ? { ...a, assignedTo: studentId } : a));
    setNotifications([...notifications, { id: notifications.length + 1, message: `Student assigned to Assignment ${assignmentId}`, read: false }]);
  };

  const addUser = (user) => {
    const newUser = { id: users.length + 1, ...user, profile: { email: `${user.username}@edutask.com` } };
    setUsers([...users, newUser]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().split('T')[0];
      assignments.forEach(assignment => {
        if (assignment.dueDate === today && assignment.published) {
          setNotifications(prev => [...prev, { id: prev.length + 1, message: `Reminder: ${assignment.title} is due today!`, read: false }]);
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [assignments]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, assignments, createAssignment, editAssignment, deleteAssignment, publishAssignment, submissions, submitAssignment, markSubmission, users, addUser, assignStudentToAssignment, notifications, markNotificationAsRead }}>
      {children}
    </AuthContext.Provider>
  );
};