// import React from 'react';
// import { getAllOrders } from '../api'
// import './Components.css';

// const Order = ({
//   user,
// }) => {
//   let { orderId } = useParams();
//   const [order, setOrder] = useState([])
//   // const [status, setStatus] = useState([])

//   const fetchOrder = async () => {
//     try {
//       const orderFetched = await getAllOrders(orderId)
//       setOrder(orderFetched)
//     } catch (error) {
//       throw error
//     }
//   }

//   useEffect(() => {
//     fetchOrder(user)
//   }, [user]);

//   return (
//     <div className='orders'>
//       <div key={order.id} className='order-card'></div>
//       <h3>{order.status}</h3>
//       <h3>{order.dataPlaced}</h3>
//     </div>
//   );
// };
// export default Order