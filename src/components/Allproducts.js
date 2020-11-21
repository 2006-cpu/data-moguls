import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';

export default function Allproducts() {

  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const products = await getAllProducts();

      setProducts(products);
    } catch (error) {
      throw error;
    };
  };

  useEffect(() => {
    fetchAllProducts();
  });

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
