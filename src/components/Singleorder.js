import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getOrderById } from '../api';
import './Styles.css';

export default function Singleorder({cart}) {
    let { orderId } = useParams();
    
    const displayCart = () => {
        let total = 0;

        return <div className='cart'>
            <h1>Cart:</h1>
            {cart.products.map(product => {
                total = product.totalProductPrice + total;
                return <div key={product.id}>
                    <div className='product-card'><img className='thumbnail' src={product.imageURL} />
                        <h3>{product.name}</h3>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.totalProductPrice * .01}</p>
                    </div>
                </div>
            })}
            <br/>
            <h2>Total:  ${(total * .01).toFixed(2)}</h2>
            <button className="button" id="payButton">Pay now!</button>
        </div>
    };

    const displayOrder = () => {
        let total = 0;

        const [thisOrder, setThisOrder] = useState('')

        const fetchOrder = async () => {
            try {
                const order = await getOrderById(orderId);
                
                setThisOrder(order);
            } catch (error) {
                throw error;
            };
        };

        useEffect(() => {
            fetchOrder()
        }, []);

        return <div className='cart'>
            <h1>This is a {thisOrder.status} order.</h1>
            {thisOrder.products ? (
                thisOrder.products.map(product => {
                    total = product.totalProductPrice + total;
                    return <div key={product.id}>
                        <div className='product-card'><img className='thumbnail' src={product.imageURL} />
                            <h3>{product.name}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${product.totalProductPrice * .01}</p>
                        </div>
                    </div>
                })
            ) : ''}
            <br/>
            <h2>Total:  ${(total * .01).toFixed(2)}</h2>
        </div>
    }

    return <div className='orders'>
        {cart.id ==  orderId ? displayCart() : displayOrder()}
    </div>
};