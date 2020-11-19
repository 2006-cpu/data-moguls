import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../db/products.js';

export default function Allproducts () {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts()
      .then(result => {
        setProducts(result);
      })
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map(({ id, name, description, price, isPublic, category }) => (
        <div key={id}>
          <h2>{name} in {category}</h2>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
        </div>
      ))}
    </div>
  )
};
