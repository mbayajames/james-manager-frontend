import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiLock } from 'react-icons/fi';
import '../styles/Pages.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and Password are required.');
      return;
    }
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials.');
    }
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    setShowResetForm(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert('Please enter your email.');
      return;
    }
    alert(`A password reset link has been sent to ${resetEmail}.`);
    setShowResetForm(false);
    setResetEmail('');
  };

  return (
    <div className="login-page" style={{ animation: 'fadeIn 1s ease-in' }}>
      <h2 style={{ color: '#3b82f6' }}>Login</h2>
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}
      {!showResetForm ? (
        <form onSubmit={handleLogin}>
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative', marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
            <FiLock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />
          </div>
          <button type="submit">Login</button>
          <a
            href="#"
            onClick={handleForgetPassword}
            style={{ marginTop: '10px', display: 'block', color: '#3b82f6', textDecoration: 'none' }}
          >
            Forget Password?
          </a>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <button type="submit">Send Reset Link</button>
          <button
            onClick={() => setShowResetForm(false)}
            style={{ backgroundColor: '#4b5563', marginTop: '10px' }}
          >
            Cancel
          </button>
        </form>
      )}
      <footer style={{ marginTop: 'auto', padding: '20px', textAlign: 'center', color: '#3b82f6' }}>
        EduTask Manager - Streamlining Education | Contact: support@edutaskmanager.com
      </footer>
    </div>
  );
};

export default Login;