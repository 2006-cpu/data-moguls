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
    <h2 style={{ color: '#FFF', marginLeft: '1rem' }}>User Profile:</h2>
      <div key={user.id} className='user-card'>
        <div className='userdata'>
          {/* <h2>User profile</h2> */}
          <p className='description'>First Name: <u>{user.firstName}</u></p>
          <p className='description'>Last Name: <u>{user.lastName}</u></p>
          <p className='description'>Email: <u>{user.email}</u></p>
          {user.imageURL ? <img className='thumbnail' src={user.imageURL} /> : <div className='thumbnail'></div>}
        </div>
        <div key={user.id + 1} className='orderhistory'>
          <h2>Order History for {user.firstName} {user.lastName} </h2>
          {orders.length > 0 ? orders.map((order, indx) => {
            return <div key={order.id}>
              <NavLink to={`/order/${order.id}`} className='button'>ORDER {indx + 1}: {order.status}</NavLink>
            </div>
          }) : <h2>No orders</h2>}
        </div>
      </div>
    </div>
  </>
};
