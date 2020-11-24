import React from 'react';
import { Search } from './';
import { NavLink } from 'react-router-dom';
import './Components.css';

export default function Navbar() {
  return (
    <div className='navbar'>
      <NavLink to='/' className='button'>HOME</NavLink>
      <NavLink to='/products' className='button'>SHOP PRODUCTS</NavLink>
      <NavLink to='/login' className='button'>LOGIN</NavLink>
      <NavLink to='/orders' className='button'>ORDERS</NavLink>
      <Search />
    </div>
  );
};
