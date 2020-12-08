import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserOrdersById } from '../api';
import './Styles.css';

export default function User({ user, token, orders, setOrders }) {
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
  }, [user]);

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
        <div key={user.id + 1} className='orderhistory'>
          <h2>Order History for {user.firstName} {user.lastName}: </h2>
          {orders.length > 0 ? orders.map((order, indx) => {
            return <div key={order.id}>
              <NavLink to={`/order/${order.id}`} className='button'>Order {indx + 1}: {order.status}</NavLink>
            </div>
          }) : <h2>No orders</h2>}
        </div>
      </div>
    </div>
  </>
};
