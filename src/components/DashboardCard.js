import React from 'react';
import '../styles/Components.css';

const DashboardCard = ({ title, value, trend }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{value} {trend && <span className="trend">{trend}</span>}</p>
    </div>
  );
};

export default DashboardCard;