// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/data-moguls';
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

async function getProductById({id}) {
  try {
    const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE id = $1;
      `, [id]);

    return product;
  } catch (error) {
    throw error;
  };
};

async function createOrder({status, userId}){
  const { rows : [order]} = await client.query(`
    INSERT INTO orders(status, "userId")
    VALUES ($1, $2)
    RETURNING *;
  `, [status, userId]);

  return order;
};

async function getAllOrders(){
  try {
    const {rows : orders} = await client.query(`
    SELECT * FROM orders;
  `);

  for(let order of orders){
    const { rows: [products]} = await client.query(`
      SELECT * FROM order_products
      WHERE "orderId" = $1;
    `, [order.id]);

    order.products = products;
  };
  
  return orders
  } catch (error) {
    throw error;
  };
}

async function getOrderById({id}){
  try {
    const { rows: [order]} = await client.query(`
      SELECT * FROM orders
      WHERE id = $1;
    `, [id]);

    const { rows: [products]} = await client.query(`
      SELECT * FROM order_products
      WHERE "orderId" = $1;
    `, [order.id])

    order.products = products;

    return order;
  } catch (error) {
    throw error;
  };
};

async function getOrderByUser({username}){
  try {
    const { rows: [user]} = await client.query(`
      SELECT * FROM users
      WHERE username = $1;
    `, [username]);

    const order = await getOrderById({id: user.id});

    return order;
  } catch (error) {
    throw error;
  };
};

async function getOrderByProduct({id}){
  try {
    const { rows: orders} = await client.query(`
      SELECT * FROM order_products
      WHERE "productId" = $1;
  `, [id]);

  return orders;
  } catch (error) {
    throw error;
  };
};

async function getCartByUser({id}){
  try {
    const { rows: orders} = await client.query(`
      SELECT * FROM orders
      WHERE "userId" = $1
      AND status = 'created';
    `, [id]);

    return orders;
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
  getProductById,
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUser,
  getOrderByProduct,
  getCartByUser
};
