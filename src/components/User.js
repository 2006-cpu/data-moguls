import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { getUserByUsername } from '../api';
import './Styles.css';

export default function User ({user, token, setUser}) {
  const getUserInfo = async () => {
    try {
      const userInfo = await getUserByUsername(token);
      setUser(userInfo);
    } catch (error) {
      throw error;
    };
  };

  useEffect(()=> {
    getUserInfo();
  }, []);

  return <>
    <div className='user'>
      <div key={user.id} className='user-card'>
        <div className='userdata'>
          <h2>User profile for {user.username}</h2>
          <p className='description'>First Name: {user.firstName}</p>
          <p className='description'>Last Name: {user.lastName}</p>
          <p className='description'>Email: {user.email}</p>
          <p className='description'>Admin? {user.isAdmin ? 'Yes' : 'No'}</p>
          {user.imageURL ? <img className='thumbnail' src={user.imageURL} /> : <div className='thumbnail'></div>}
        </div>
        <div className='orderhistory'>
          <h2>Order History</h2>
        </div>
      </div>
    </div>
  </>
};
