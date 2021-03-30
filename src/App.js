import React from 'react';
import './index.less';
import 'antd/dist/antd.less';
import { Route, Switch, useHistory } from 'react-router-dom';

import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { config } from './utils/oktaConfig';

import AfterLogin from './components/forms/LoginForm/AfterLogin/AfterLoginContainer';

import NavBar from './components/navigation/navigation';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SearchPage from './components/pages/SearchPage';
import MapPage from './components/pages/MapPage';
import GroomerPublicProfilePage from './components/pages/GroomerPublicProfilePage';
import CustomerDashboardPage from './components/pages/CustomerDashboardPage';
import GroomerDashboardPage from './components/pages/GroomerDashboardPage';
import GroomerProfilePage from './components/pages/GroomerProfilePage';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={AfterLogin} />
        <Route path="/info" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/search" component={SearchPage} />
        <Route path="/groomers/:id" component={GroomerProfilePage} />
        <Route path={'/groomer-map'} component={MapPage} />
        <Route
          path="/groomer-search-results/:id"
          component={GroomerPublicProfilePage}
        />

        <SecureRoute path="/groomer-profile" component={GroomerProfilePage} />
        <SecureRoute
          path="/groomer-dashboard"
          component={GroomerDashboardPage}
        />
        <SecureRoute
          path="/customer-dashboard"
          component={CustomerDashboardPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}

export default App;
