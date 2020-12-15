import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';

import { Header, Navbar, Login, Signup, User, Product, Allproducts, Footer, Productcart, Thankyou } from './';
import './Styles.css';

import { getUserByUsername, getUsersCart } from '../api';

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [orders, setOrders] = useState('');
  const [cart, setCart] = useState('');

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('currentToken');
    { token ? setToken(token) : '' };
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
      if (cart.name === 'NoOrder') {
        setCart('')
      } else {
        setCart(cart);
      };


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
        <Navbar token={token} setUser={setUser} setToken={setToken} cart={cart} />
        <Switch>

          <Route exact path='/'>
            <div className='home'>
              <div className='home-card'><h1>Welcome to KraftBier.com</h1>
                <p>Modern U.S. craft beer history began in the 1960's, rose in popularity in the 1970's and came to its own with the rise of microbreweries in the 1990's. The sheer number of beers that make up the craft beer scene is exciting, but it can also be intimidating, and that’s okay!<br /><br /></p>
                <p>KraftBier.com is designed for the refined beer connoisseur, who appreciates specialty and unique beers from around the world. Since the beer market is saturated with thousands of craft beers, we've decided to narrow our product offerings to a select few, based on the most recent releases and customer recommendations. And, we rotate our product offerings every month, so that our selection stays fresh, relevant, and on the cutting edge.</p><br /><br />
                <NavLink to='/products' className='button'>SHOP OUR PRODUCTS</NavLink></div>
            </div>
          </Route>

          <Route path='/products'>
            <Allproducts />
          </Route>

          <Route path='/product/:productId'>
            <Product cart={cart} token={token} setCart={setCart} />
          </Route>

          <Route path='/login'>
            <Login setToken={setToken} setUser={setUser} token={token} setOrders={setOrders} />
          </Route>

          <Route path='/signup'>
            <Signup setUser={setUser} setToken={setToken} />
          </Route>

          {token ? <Route path='/users'>
            <User user={user} token={token} setUser={setUser} orders={orders} setOrders={setOrders} />
          </Route> : null}

          {token ? <Route path='/order/:orderId'>
            <Productcart cart={cart} setCart={setCart} token={token} />
          </Route> : null}

          <Route path='/thankyou'>
            <Thankyou />
          </Route>

          <Redirect to='/' />

        </Switch>
        <Footer />
      </div>
    </Router >
  );
}
