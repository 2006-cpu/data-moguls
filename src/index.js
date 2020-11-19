import React from 'react';
import ReactDOM from 'react-dom';

import { 
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';

import {
  Product
} from './components';

const App = () => {

  return <Router>
    <Switch>
      <Route path="/product/:productId">
        <Product />
      </Route>
    </Switch>
  </Router>
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);