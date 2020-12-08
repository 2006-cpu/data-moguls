import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { getProductById } from '../api';
import { getCurrentToken } from '../auth';
import './Styles.css';

export default function Product() {

    let { productId } = useParams();
    const [product, setProduct] = useState([]);

    const fetchProduct = async () => {
        try {
            const productFetched = await getProductById(productId);

            setProduct(productFetched);
        } catch (error) {
            throw error;
        };
    };

    const addProductToCart = () => {
        try {
            console.log("ADD SOMETHING")
        } catch (error) {
            throw error;
        };
    };

    useEffect(() => {
        fetchProduct();
    }, [])

    return <div className='product'>
        <div key={product.id} className='product-card'>
            <div>
                <img className='image' src={product.imageURL} />
            </div>
            <div>
                <h2>{product.name}</h2>
                <p className='description' style={{ fontStyle: 'italic' }}>{product.description}</p>
                <p className='description'>Category: {product.category}</p>
                <p className='description'>Price: ${product.price * .01}</p>
                <p className='description' style={{ color: '#FF6666' }}>{product.inStock ? 'In Stock!' : 'Out of Stock'}</p>
                <button onClick={addProductToCart}>Order</button>
                <NavLink to='/products' className='button'>BACK TO PRODUCTS</NavLink>
            </div>
        </div>
    </div>
};
