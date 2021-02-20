import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';

const NoResults = () => {
  return (
    <div className="site-card-border-less-wrapper">
      <Card style={{ width: 400 }}>
        <h3 style={{ textAlign: 'center' }}>No results</h3>
      </Card>
    </div>
  );
};

export default NoResults;
