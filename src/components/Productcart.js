import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getOrderById, removeProductFromOrder } from '../api';
import { useHistory } from 'react-router-dom';
import './Styles.css';

export default function Productcart ({ cart, setCart, token }) {
    let { orderId } = useParams();

    const history = useHistory();

    const handleClick = () => {
        setTimeout(function(){ history.push('/thankyou'); }, 500);
    };

    const displayCart = () => {
        let total = 0;

        return (<div className='cart'>
            <h2 style={{color: '#FFF', marginLeft: '1rem'}}>My Cart:</h2>
            <div className='cart-card'>
                {cart.products.map(product => {
                    total = product.totalProductPrice + total;
                    return (<div key={product.id} style={{borderBottom: '1px solid black', marginBottom: '3rem' }}>

                        <img className='thumbnail' src={product.imageURL} />
                        <h3>{product.name}</h3>
                        <p >Quantity: {product.quantity}</p>
                        <p className='description'>Price: ${(product.totalProductPrice * .01).toFixed(2)}</p>
                        <button onClick={async () => {
                            await removeProductFromOrder({ orderId: cart.id, productId: product.id }, token)
                            const newProducts = cart.products.filter(({ id }) => {

                                return (id !== product.id)
                            })
                            const newCart = { ...cart, products: newProducts }
                            setCart(newCart)
                        }}>REMOVE</button>
                    </div>)
                })}
            </div>
            <br />
            <div className='cart-card2'>
                <div>
                    <button className="paybutton" id="payButton" onClick={handleClick}>CHECK OUT</button>
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
