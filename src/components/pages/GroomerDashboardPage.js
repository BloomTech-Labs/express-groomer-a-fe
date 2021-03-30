import React from 'react';
import GroomerTab from '../dashboards/GroomerDashboard/groomer-tabs';
import '../dashboards/GroomerDashboard/groomer-dash.scss';
import FadeIn from 'react-fade-in';

const GroomerDashboardPage = () => {
  return (
    <div className="tab-bar">
      <FadeIn delay={200} transitionDuration={650}>
        <div id="tabs">
          <GroomerTab />
        </div>
      </FadeIn>
    </div>
  );
};

export default GroomerDashboardPage;
