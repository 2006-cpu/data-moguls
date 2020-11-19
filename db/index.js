// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/data-moguls'
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods
async function createProduct({ name, description, price, imageURL, inStock, category }) {
  try {
    const { rows: [product] } = await client.query(`
          INSERT INTO products(name, description, price, "imageURL", "inStock", category)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
      `, [name, description, price, imageURL, inStock, category]);

    return product;
  } catch (error) {
    throw error;
  };
};

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
          SELECT * FROM products;
      `);

    return products;
  } catch (error) {
    throw error;
  };
};

async function getProductById(id) {
  try {
    const { rows: [product] } = await client.query(`
          SELECT * FROM products
          WHERE id = ${id};
      `);

    return product;
  } catch (error) {
    throw error;
  };
};

// export
module.exports = {
  client,
  // db methods
  createProduct,
  getAllProducts,
  getProductById
}