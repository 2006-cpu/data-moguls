import React, { useState, useEffect } from 'react';
import { getProductById } from '../db/products.js';

export default function Product () {

  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProductById()
      .then(result => {
        setProduct(result);
      })
  }, []);

  return (
    <div>
      <h1>Products</h1>
        <div key={id}>
          <h2>{name} in {category}</h2>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
        </div>
    </div>
  )
};
