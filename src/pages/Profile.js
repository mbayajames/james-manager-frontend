// src/pages/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages.css';

const Profile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="profile-page">
      <h2 style={{ color: '#3b82f6' }}>Profile</h2>
      {currentUser && (
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#1e293b' }}>
          <p><FiUser style={{ marginRight: '8px' }} /> Username: {currentUser.username}</p>
          <p>Email: {currentUser.profile.email}</p>
          <button onClick={handleLogout} style={{ marginTop: '20px', display: 'flex', alignItems: 'center', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
            <FiLogOut style={{ marginRight: '5px' }} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;