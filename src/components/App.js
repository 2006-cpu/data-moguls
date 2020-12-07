import React, {useEffect, useState} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';

import { Header, Navbar, Orders, Login, Signup, User, Product, Allproducts, Footer, Singleorder } from './';
import './Styles.css';

import { getUserByUsername, getUsersCart, getUserOrdersById } from '../api';

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [orders, setOrders] = useState('');
  const [cart, setCart] = useState('');

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('currentToken');
    {token ? setToken(token) : ''};
    try {
      const userInfo = await getUserByUsername(token);
      
      setUser(userInfo);
    } catch (error) {
      throw error;
    };
  };

  const fetchCart = async () => {
    try {
      const cart = await getUsersCart(token);
      setCart(cart);

    } catch (error) {
      throw error;
    }
  }
 
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar token={token} setUser={setUser} setToken={setToken} cart={cart}/>
        <Switch>

          <Route exact path='/'>
            <>
              <div className='homeimage'></div>
              <div className='home'><h1>Welcome to KraftBier.com</h1>
                <p>Modern U.S. craft beer history began in the 1960s. You may know part of the story, the increasing popularity of homebrewing beer in the 1970s and the rise of microbreweries in the 1990s. The sheer number of beer styles that make up the craft beer scene is exciting, but it can also be intimidating, and that’s okay!<br /><br /></p>
                <p>With all of the different beer name and styles, it may be tough to remember what differentiates beers from one another. At KraftBier.com, we have compiled a collection of craft beers that have been favorites over the years, and have made it available direct to you, straight from the brewers themselves.</p>
              </div>
              <div className='home2'><NavLink to='/products' className='button'>SHOP OUR PRODUCTS</NavLink></div>
            </>
          </Route>

          <Route path='/products'>
            <Allproducts />
          </Route>

          <Route path='/product/:productId'>
            <Product />
          </Route>

          <Route path='/login'>
            <Login setToken={setToken} setUser={setUser} token={token} setOrders={setOrders}/>
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <Route path='/users'>
            <User user={user} token={token} setUser={setUser} orders={orders} setOrders={setOrders}/>
          </Route>

          <Route path='/orders'>
            <Orders />
          </Route>

          <Route path='/order/:orderId'>
            <Singleorder cart={cart}/>
          </Route>

          <Redirect to='/' />

        </Switch>
        <Footer />
      </div>
    </Router >
  );
}
