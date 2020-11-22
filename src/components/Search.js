import React from 'react';
import { NavLink } from 'react-router-dom';
import './Components.css';

export default function Search() {
  return (
    <div className='search'>
      <form className="search-form" action="/search">
        <input type="text" name="search-term" placeholder="SEARCH" />
        <button id='search-button'>SEARCH</button>
    </form>
    </div>
  );
};
