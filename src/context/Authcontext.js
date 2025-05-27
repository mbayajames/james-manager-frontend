import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('token', data.token);
        fetchAssignments();
        fetchSubmissions();
        fetchNotifications();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    setAssignments([]);
    setSubmissions([]);
    setNotifications([]);
  };

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/assignment', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submission', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/notifications', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const createAssignment = async (assignment) => {
    try {
      const response = await fetch('http://localhost:5000/api/assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(assignment),
      });
      const newAssignment = await response.json();
      setAssignments([...assignments, newAssignment]);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const editAssignment = async (id, updatedAssignment) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedAssignment),
      });
      const updated = await response.json();
      setAssignments(assignments.map(a => (a._id === id ? updated : a)));
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/assignment/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setAssignments(assignments.filter(a => a._id !== id));
      setSubmissions(submissions.filter(s => s.assignmentId !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const publishAssignment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ published: true }),
      });
      const updated = await response.json();
      setAssignments(assignments.map(a => (a._id === id ? updated : a)));
    } catch (error) {
      console.error('Error publishing assignment:', error);
    }
  };

  const submitAssignment = async (submission) => {
    try {
      const response = await fetch('http://localhost:5000/api/submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(submission),
      });
      const newSubmission = await response.json();
      setSubmissions([...submissions, newSubmission]);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const markSubmission = async (submissionId, marks, result, feedback) => {
    try {
      const response = await fetch(`http://localhost:5000/api/submission/${submissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ marks, result, feedback }),
      });
      const updated = await response.json();
      setSubmissions(submissions.map(s => (s._id === submissionId ? updated : s)));
    } catch (error) {
      console.error('Error marking submission:', error);
    }
  };

  const assignStudentToAssignment = async (assignmentId, studentId) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ assignmentId, studentId }),
      });
      const updatedAssignment = await response.json();
      setAssignments(assignments.map(a => (a._id === assignmentId ? updatedAssignment : a)));
    } catch (error) {
      console.error('Error assigning student:', error);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/notifications/${id}`, {
        method: 'PUT',
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      const updated = await response.json();
      setNotifications(notifications.map(n => (n._id === id ? updated : n)));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchAssignments();
      fetchSubmissions();
      fetchNotifications();
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      assignments,
      createAssignment,
      editAssignment,
      deleteAssignment,
      publishAssignment,
      submissions,
      submitAssignment,
      markSubmission,
      assignStudentToAssignment,
      notifications,
      markNotificationAsRead,
    }}>
      {children}
    </AuthContext.Provider>
  );
};