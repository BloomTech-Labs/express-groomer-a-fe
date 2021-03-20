import React from 'react';
import CustTab from '../dashboards/CustomerDashboard/cust-tabs';
import '../dashboards/CustomerDashboard/cust-dash.scss';
import FadeIn from 'react-fade-in';

const CustomerDashboardPage = () => {
  return (
    <div className="tab-bar">
      <FadeIn delay={200} transitionDuration={650}>
        {/* <h1 className="dashboard">Dashboard</h1> */}
        <div id="tabs">
          <CustTab />
        </div>
      </FadeIn>
    </div>
  );
};

export default CustomerDashboardPage;
