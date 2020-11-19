import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  return (
    <div>
      <NavLink to='/'><button>HOME</button></NavLink>
      <NavLink to='/product/:productId'><button>PRODUCT</button></NavLink>
      <NavLink to='/products'><button>ALL PRODUCTS</button></NavLink>
      {showLink}
    </div>
  );
};
