// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import { routes } from './routes';
import './styles/App.css';

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {currentUser && <Sidebar userRole={currentUser.role} />}
          <div className="main-content">
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route.protected && !currentUser ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <route.component />
                    )
                  }
                />
              ))}
              <Route path="*" element={<Navigate to={currentUser ? '/' : '/login'} replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;