import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

/* import { Navbar } from './Navbar'; */

import { Navbar, Product, Allproducts } from './';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>

          <Route path='/products'>
            <Allproducts />
          </Route>

          <Route path='/product/:productId'>
            <Product />
          </Route>

        </Switch>
      </Router>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
