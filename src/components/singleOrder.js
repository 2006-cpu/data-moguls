import React, { useState, useEffect } from 'react';

import { useParams } from "react-router";
import { getOrderById } from '../api';
import { NavLink } from 'react-router-dom';

const SingleOrder = () => {
    let { orderId } = useParams();
    const [order, setOrder] = useState([])



    const fetchOrder = async () => {
        try {
            const orderFetched = await getOrderById(orderId);

            setOrder(orderFetched);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return (<>
        <div className='orders'>
            <div key={order.id} className='order-card'></div>
            <NavLink to={`/order/${id}`}></NavLink>
            <h3>{order.status}</h3>
            <h3>{order.dataPlaced}</h3>
        </div>
    </>)
};

export default SingleOrder;

