import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { addProductToOrder, getProductById } from '../api';
import './Styles.css';

export default function Product({ cart, token, setCart }) {

    let { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [alert, setAlert] = useState('')

    const fetchProduct = async () => {
        try {
            const productFetched = await getProductById(productId);

            setProduct(productFetched);
        } catch (error) {
            throw error;
        };
    };

    useEffect(() => {
        fetchProduct();
    }, [])

    const addProductToCart = async (event) => {
        try {
            event.preventDefault();
            const quantity = document.getElementById("quantity").value;

            if (quantity === '') {
                setAlert("Please remember to add quantity.")
            } else {
                const newCart = await addProductToOrder(cart.id, product.id, product.price * quantity, quantity, token);
                setCart(newCart);
                setAlert('Your order has been placed in your cart.')
            };
        } catch (error) {
            throw error;
        };
    };

    const mustLogIn = (event) => {
        event.preventDefault();
        setAlert('You must be logged in to purchase.')
    };

    return <div className='product'>
        <div key={product.id} className='product-card'>
            <div>
                <img className='image' src={product.imageURL} />
            </div>
            <div>
                <div className='alert'>{alert}</div>
                <h2>{product.name}</h2>
                <p className='description' style={{ fontStyle: 'italic' }}>{product.description}</p>
                <p className='description'>Category: {product.category}</p>
                <p className='description'>Price: ${product.price * .01}</p>
                <p className='description' style={{ color: '#FF6666' }}>{product.inStock ? 'In Stock!' : 'Out of Stock'}</p>
                <form>
                    {token ? (<><label htmlFor='quantity'>Quantity: </label>
                        <input type='number' id='quantity' min='1' />
                        <button onClick={addProductToCart}>PURCHASE PRODUCT</button></>) : <button onClick={mustLogIn}>PURCHASE PRODUCT</button>}
                </form>
                <NavLink to='/products' className='button'>BACK TO PRODUCTS</NavLink>
            </div>
        </div>
    </div>
};
