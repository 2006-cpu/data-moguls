import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { clearCurrentUser, clearCurrentToken } from '../auth';
import './Styles.css';

export default function Navbar({ token, setUser, setToken, cart }) {
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    setToken('');
    setUser('');
    clearCurrentUser();
    clearCurrentToken();
    history.push('/');
  };

  return (<>

    {token ?

      <div className='navbar'>
        <NavLink to='/' className='button'>HOME</NavLink>
        <NavLink to='/products' className='button'>SHOP PRODUCTS</NavLink>
        <NavLink to='/users' className='button'>MY INFO</NavLink>
        {cart ? <NavLink to={`/order/${cart.id}`} className='button'>VIEW CART</NavLink> : ''}
        <button className='button' onClick={handleClick}>LOGOUT</button>
      </div> :

      <div className='navbar'>
        <NavLink to='/' className='button'>HOME</NavLink>
        <NavLink to='/products' className='button'>SHOP PRODUCTS</NavLink>
        <NavLink to='/login' className='button'>LOGIN/SIGNUP</NavLink>
      </div>}
  </>);
};
