import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUserPlus } from 'react-icons/fi';
import '../styles/Pages.css';

const UserManagement = () => {
  const { users, addUser, assignStudentToAssignment, assignments } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'student' });
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      alert('Please provide a username and password.');
      return;
    }
    addUser(newUser);
    alert('User added successfully!');
    setNewUser({ username: '', password: '', role: 'student' });
  };

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedStudent || !selectedAssignment) {
      alert('Please select a student and assignment.');
      return;
    }
    assignStudentToAssignment(parseInt(selectedAssignment), parseInt(selectedStudent));
    alert('Student assigned successfully!');
    setSelectedStudent('');
    setSelectedAssignment('');
  };

  return (
    <div className="user-management-page">
      <h2 style={{ color: '#3b82f6' }}>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ backgroundColor: '#ffffff', padding: '10px', marginBottom: '10px', borderRadius: '4px', color: '#1e293b' }}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
      <h3>Add New User</h3>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">
          <FiUserPlus style={{ marginRight: '5px' }} /> Add User
        </button>
      </form>
      <h3>Assign Student to Assignment</h3>
      <form onSubmit={handleAssign}>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>
          {users.filter(user => user.role === 'student').map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <select
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.target.value)}
        >
          <option value="">Select Assignment</option>
          {assignments.map(assignment => (
            <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
          ))}
        </select>
        <button type="submit">Assign</button>
      </form>
    </div>
  );
};

export default UserManagement;