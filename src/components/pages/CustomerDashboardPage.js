import React from 'react';
import CustTab from '../dashboards/CustomerDashboard/cust-tabs';
import '../dashboards/CustomerDashboard/cust-dash.scss';

const CustomerDashboardPage = () => {
  return (
    <div className="tab-bar">
      <h1 className="dashboard">Dashboard</h1>
      <div id="tabs">
        <CustTab />
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
