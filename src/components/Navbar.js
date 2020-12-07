import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentToken, clearCurrentUser, clearCurrentToken } from '../auth';
import './Styles.css';

export default function Navbar() {

  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    setToken('');
    setUser('');
    clearCurrentUser();
    clearCurrentToken();
    window.location.reload();
    alert('You are now logged out!')
  };

  return (<>

    {getCurrentToken() ?

      <div className='navbar'>
        <NavLink to='/' className='button'>HOME</NavLink>
        <NavLink to='/products' className='button'>SHOP PRODUCTS</NavLink>
        <NavLink to='/users' className='button'>MY INFO</NavLink>
        <NavLink to='/orders' className='button'>VIEW CART</NavLink>
        <button className='button' onClick={handleClick}>LOGOUT</button>
      </div> :

      <div className='navbar'>
        <NavLink to='/' className='button'>HOME</NavLink>
        <NavLink to='/products' className='button'>SHOP PRODUCTS</NavLink>
        <NavLink to='/login' className='button'>LOGIN/SIGNUP</NavLink>
      </div>}
  </>);
};
