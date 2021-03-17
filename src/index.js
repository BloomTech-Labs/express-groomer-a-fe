import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// messagebird import
// import initMB from 'messagebird';
// const messagebird = initMB('<YOUR_ACCESS_KEY>');

// context import
import { RootProvider } from './state/contexts/RootContext';

ReactDOM.render(
  <Router>
    <RootProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </RootProvider>
  </Router>,
  document.getElementById('root')
);
