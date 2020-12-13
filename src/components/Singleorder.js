import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getOrderById, removeProductFromOrder } from '../api';
import './Styles.css';

export default function Singleorder({ cart }) {
    let { orderId } = useParams();

    const displayCart = () => {
        let total = 0;

        return (<div className='cart'>
            <h2>My Cart:</h2>
            <div className='cart-card'>
                {cart.products.map(product => {
                    total = product.totalProductPrice + total;
                    return (<div key={product.id}>
                            <img className='thumbnail' src={product.imageURL} />
                            <h3>{product.name}</h3>
                            <p >Quantity: {product.quantity}</p>
                            <p className='description'>Price: ${(product.totalProductPrice * .01).toFixed(2)}</p>
                        </div>
                    </div>)
                })}
            </div>
            <br />
            <div className='cart-card2'>
                <div>
                    <button className="button" id="payButton">CHECK OUT</button>
                </div>
                <div>
                    <div className='price'><p>Subtotal:</p><p> ${(total * .01).toFixed(2)}</p></div>
                    <div className='price'><p>Sales Tax:</p><p> ${((total * .01) * .085).toFixed(2)}</p></div>
                    {total ? <div className='price'><p>Shipping:</p><p> ${(((total * .01) * .05) + 5).toFixed(2)}</p></div> : <div className='price'><p>Shipping:</p><p> ${((total * .01) * .05).toFixed(2)}</p></div>}
                    {total ? <div className='price'><h3>Total:</h3> <h3>${(((total * .01) * 1.135) + 5).toFixed(2)}</h3></div> : <div className='price'><h3>Total:</h3> <h3>${((total * .01) * 1.135).toFixed(2)}</h3></div>}
                </div>
            </div>
        </div>)
    };

    const displayOrder = () => {
        let total = 0;
        const [thisOrder, setThisOrder] = useState('');

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

        return (<div className='cart'>

            <h2>This is a {thisOrder.status} order.</h2>
            <div className='cart-card'>
                {thisOrder.products ? (
                    thisOrder.products.map(product => {
                        total = product.totalProductPrice + total;
                        return (<div key={product.id}>
                            <img className='thumbnail' src={product.imageURL} />
                            <h3>{product.name}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Price: ${(product.totalProductPrice * .01).toFixed(2)}</p>
                        </div>)
                    })
                ) : ''}
            </div>
            <br />
            <div className='cart-card2'>
                <div>
                    <button className="button" id="payButton">CHECK OUT</button>
                </div>
                <div>
                    <div className='price'><p>Subtotal:</p><p> ${(total * .01).toFixed(2)}</p></div>
                    <div className='price'><p>Sales Tax:</p><p> ${((total * .01) * .085).toFixed(2)}</p></div>
                    {total ? <div className='price'><p>Shipping:</p><p> ${(((total * .01) * .05) + 5).toFixed(2)}</p></div> : <div className='price'><p>Shipping:</p><p> ${((total * .01) * .05).toFixed(2)}</p></div>}
                    {total ? <div className='price'><h3>Total:</h3> <h3>${(((total * .01) * 1.135) + 5).toFixed(2)}</h3></div> : <div className='price'><h3>Total:</h3> <h3>${((total * .01) * 1.135).toFixed(2)}</h3></div>}
                </div>
            </div>
        </div>)
    }

    return <div className='orders'>
        {cart.id == orderId ? displayCart() : displayOrder()}
    </div>
};
