// import React, { useState, useEffect } from 'react';

// import { useParams } from "react-router";
// import { getOrderById } from '../api';
// import { NavLink } from 'react-router-dom';
// import './Styles.css';

// export default function singleOrder() {
//     const [order, setOrder] = useState([])
//     let { orderId } = useParams();


//     const fetchOrder = async () => {
//         try {
//             const orderFetched = await getOrderById(orderId);

//             setOrder(orderFetched);

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     useEffect(() => {
//         fetchOrder();
//     }, []);

//     return <>
//         <h1>This is the order with id: {orderId}</h1>
//         {order ? <><p>Name of : { }</p>
//             <p> description: { }</p>
//             <p>Price: ${ }</p></>
//             : ''}
//     </>
// };

// export default Product;

