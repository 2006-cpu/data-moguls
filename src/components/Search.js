import React from 'react';
import { NavLink } from 'react-router-dom';
import './Components.css';

export default function Search() {

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <div className='search'>
      <form className="search-form" action="/search">
        <input type="text" name="search-term" placeholder="SEARCH" />
        <button id='search-button' onClick={ handleClick }>SEARCH</button>
    </form>
    </div>
  );
};
