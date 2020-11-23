import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { NavLink } from 'react-router-dom';
import './Components.css';

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
    <div className='allproducts'>
      <h1>Products</h1>

      <div className='product-card'>

      {products.map(({ id, name, description, price, isPublic, category }) => (
              <div key={id}>
          <h2><Navlink to='product:productId'>{name} in {category}</Navlink></h2>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
        </div>
      ))}

      </div>
    </div>
  )
};
