import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CadetAssistant from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import AboutUsPage from './screens/AboutUsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <CadetAssistant />
        </Route>
        <Route path="/about" exact>
          <AboutUsPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
