import React, { useState, useEffect } from 'react';
import './Components.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';

import { Header, Navbar, Orders, Login, Product, Allproducts, Footer } from './';

export default function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Switch>

          <Route exact path='/'>
            <>
              <div className='homeimage'></div>
              <div className='home'><h1>Welcome to KraftBier.com</h1>
                <p>Lorem ipsum dolor sit amet, vix et tamquam atomorum, mundi possit nec an, simul aliquam conclusionemque pro ad. Cu menandri disputationi sit, ad nobis commodo usu. Per at altera latine, consul quaerendum an eos. Vim regione fuisset te, amet falli ex vel. Per et congue aeterno interesset, vel id voluptatibus interpretaris. Duo fugit conceptam ad, everti accusam appetere ex ius, sit ex odio aliquando persecuti. In mea utamur inermis salutandi, pro no quem omnium aliquam, te tollit accusata ius. Pri inani partem molestie id, omnis graeci quaeque has cu, nam agam postulant expetendis ex. Mel definiebas definitiones ad, at quo nominavi interesset. Pro copiosae delicatissimi an, at sea mundi expetenda.</p>
              </div>
              <div className='home2'><NavLink to='/products' className='button'>SHOP OUR PRODUCTS =></NavLink></div>
            </>
          </Route>

          <Route path='/products'>
            <Allproducts />
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/orders'>
            <Orders />
          </Route>

          <Redirect to='/' />

        </Switch>
        <Footer />
      </div>
    </Router >
  );
}
