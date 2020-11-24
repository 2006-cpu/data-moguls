import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { NavLink } from 'react-router-dom';
import './Components.css';
import Image001 from './assets/image001.jpeg';

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
  }, []);

  return (
    <div className='all-products'>

      <div className='product-card'>
        <h3>Dummy Name</h3>
        <NavLink to='/product:productId'><img className='thumbnail' src={Image001} /></NavLink>
        <p>Dummy Category</p>
        <p>Price: $4.99</p>
        <p>In stock</p>
      </div>

      <div className='product-card'>
      <h3>Dummy Name</h3>
        <NavLink to='/product:productId'><img className='thumbnail' src={Image001} /></NavLink>
        <p>Dummy Category</p>
        <p>Price: $4.99</p>
        <p>In stock</p>
      </div>

      <div className='product-card'>
      <h3>Dummy Name</h3>
        <NavLink to='/product:productId'><img className='thumbnail' src={Image001} /></NavLink>
        <p>Dummy Category</p>
        <p>Price: $4.99</p>
        <p>In stock</p>
      </div>

      <div className='product-card'>
      <h3>Dummy Name</h3>
        <NavLink to='/product:productId'><img className='thumbnail' src={Image001} /></NavLink>
        <p>Dummy Category</p>
        <p>Price: $4.99</p>
        <p>In stock</p>
      </div>

      <div className='product-card'>
      <h3>Dummy Name</h3>
        <NavLink to='/product:productId'><img className='thumbnail' src={Image001} /></NavLink>
        <p>Dummy Category</p>
        <p>Price: $4.99</p>
        <p>In stock</p>
      </div>

      {products.map(({ id, name, description, price, imageURL, inStock, category }) => (
        <div key={id} className='product-card'>
          <h3>{name}</h3>
          <NavLink to='/product:productId'><img className='thumbnail' src={imageURL} /></NavLink>
          <p>{category}</p>
          <p>Price: {price}</p>
          <p>{inStock}</p>
        </div>
      ))}
    </div>
  )
};
