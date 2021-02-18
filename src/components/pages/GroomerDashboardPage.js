import React from 'react';
import GroomerTab from '../dashboards/GroomerDashboard/groomer-tabs';
import '../dashboards/GroomerDashboard/groomer-dash.scss';

const GroomerDashboardPage = () => {
  return (
    <div className="tab-bar">
      <h1 className="dashboard">Dashboard</h1>
      <div id="tabs">
        <GroomerTab />
      </div>
    </div>
  );
};

export default GroomerDashboardPage;
