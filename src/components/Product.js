import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { getProductById } from '../api';
import './Components.css';

const Product = () => {
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

    useEffect(() => {
        fetchProduct();
    }, []);

    console.log(product);

    return (<>

        <div className='product'>
            <div key={product.id} className='product-card'>
            <h3>{product.name}</h3>
                <img className='image' src={product.imageURL} />
                <p className='description'>{product.category}</p>
                <p className='description'>{product.description}</p>
                <p className='description'>Price: ${product.price * .01}</p>
                <p className='description' style={{ color: '#FF6666' }}>{product.inStock ? 'In Stock!' : 'Out of Stock'}</p>
                <button type="submit" >ORDER</button>
            </div>
        </div>
    </>)
};

export default Product;
