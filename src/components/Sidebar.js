import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiHome, FiBook, FiUser, FiCalendar, FiFileText, FiUsers, FiLogOut, FiBell, FiMenu, FiX } from 'react-icons/fi';
import '../styles/Sidebar.css';

const Sidebar = ({ userRole }) => {
  const { logout, notifications, markNotificationAsRead } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <button
        className="hamburger-menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 2000,
          background: 'none',
          border: 'none',
          color: '#212121',
          fontSize: '24px',
        }}
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span>EduTask Manager</span>
        </div>
        <ul>
          <li><Link to="/"><FiHome /> Dashboard</Link></li>
          <li><Link to="/assignment"><FiBook /> Assignment</Link></li> {/* Updated label and path */}
          {userRole === 'student' && <li><Link to="/submit-assignment"><FiFileText /> Submit Assignment</Link></li>}
          {userRole === 'admin' && <li><Link to="/submissions"><FiUser /> Submissions</Link></li>}
          <li><Link to="/calendar"><FiCalendar /> Calendar</Link></li>
          <li><Link to="/pages"><FiFileText /> Pages</Link></li>
          {userRole === 'admin' && <li><Link to="/user-management"><FiUsers /> User Management</Link></li>}
          {userRole === 'admin' && <li><Link to="/create-assignment"><FiBook /> Create Assignment</Link></li>}
          <li style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                padding: '10px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2d3e5d')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <FiBell style={{ marginRight: '8px' }} /> Notifications
              {unreadCount > 0 && (
                <span style={{ backgroundColor: '#FF5252', color: '#FFF', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '8px' }}>
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '0',
                backgroundColor: '#FFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderRadius: '4px',
                width: '250px',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 1000,
              }}>
                {notifications.length === 0 ? (
                  <p style={{ padding: '10px', color: '#212121' }}>No notifications</p>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #B0BEC5',
                        backgroundColor: notification.read ? '#F5F5F5' : '#E8F5E9',
                        cursor: 'pointer',
                      }}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      {notification.message}
                    </div>
                  ))
                )}
              </div>
            )}
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                padding: '10px',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2d3e5d')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <FiLogOut style={{ marginRight: '8px' }} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;