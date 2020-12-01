import React from 'react';
import { Search } from './';
import { NavLink } from 'react-router-dom';
import './Components.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <NavLink to='/' className='button'>HOME</NavLink>
      <NavLink to='/products' className='button'>SHOP PRODUCTS</NavLink>
<<<<<<< HEAD
      <NavLink to='/login' className='button'>LOGIN/SIGNUP</NavLink>
      <NavLink to='/orders' className='button'>ORDERS</NavLink>
=======
      <NavLink to='/login' className='button'>LOGIN</NavLink>
      <NavLink to='/orders' className='button'>VIEW CART</NavLink>
>>>>>>> 499b0928c11ba065a10fd13154369d808bd6a661
      <Search />
    </div>
  );
};
