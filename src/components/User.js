import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { getUserByUsername, getUserOrdersById } from '../api';
import './Styles.css';

export default function User ({user, token, orders, setOrders}) {
  const fetchOrders = async () => {
    try {
      const allOrders = await getUserOrdersById(user.id, token);

      setOrders(allOrders);
    } catch (error) {
      throw error;
    };
  };

  useEffect(() => {
    fetchOrders();
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
      </div>
      <div key={user.id + 1} className='user-card'>
        <h2>Order History:</h2>
        {orders ? orders.map((order, indx) => {
          return <div key={order.id}>
          <NavLink to={`/order/${order.id}`}>Order {indx + 1}: {order.status}</NavLink>
          </div>
        }) : ''}
      </div>
      
    </div>
  </>
};