import React, { useState } from 'react';
import { useParams } from "react-router";
import './Styles.css';

export default function Singleorder({cart}) {
    let { orderId } = useParams();
    
    const displayCart = () => {
        return <h1>This is a cart.</h1>
    };

    const displayOrder = () => {
        return <h1>This is an order.</h1>
    }
    return <div className='orders'>
        {cart.id ==  orderId ? displayCart() : displayOrder()}
    </div>
};