import React, { useState, useEffect } from 'react';

import { useParams } from "react-router";
import { getProductById } from '../api';

const Product = () => {
    let { productId } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            const productFetched = await getProductById(productId);

            setProduct(productFetched.product);
        } catch (error) {
            throw error;
        };
    };

    useEffect(()=>{
        fetchProduct();
    }, []);

    console.log(product);

    return <>
        <h1>This is the product with id: {productId}</h1>
        {product ?<><p>Name of product: {product.name}</p>
        <p>Product description: {product.description}</p>
        <p>Price: ${product.price}</p></>
        : ''}
    </>
};

export default Product;