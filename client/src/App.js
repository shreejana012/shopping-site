import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import Checkout from './Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/checkout/:id" children={<Checkout />}>
          <Checkout />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
