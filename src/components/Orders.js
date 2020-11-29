import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAllOrders } from '../api';

import './Components.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const orders = await getAllOrders();

      setOrders(orders);
    } catch (error) {
      throw error;
    };
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='orders'>
      {orders.map(({ id, status, userId, datePlaced }) => (
        <div key={id} className='order-card'>
          <NavLink to='/orders:orderId'></NavLink>
          <h3>{status}</h3>
          <p>{userId}</p>
          <p>{datePlace}</p>
        </div>
      ))}
    </div>
  )
};
