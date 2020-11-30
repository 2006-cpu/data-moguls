const {client} = require('./client');
const { getProductById } = require('./products');

async function createOrder({status, userId}){
    const { rows : [order]} = await client.query(`
        INSERT INTO orders(status, "userId")
        VALUES ($1, $2)
        RETURNING *;
    `, [status, userId]);

    return order;
};

async function addProductsToOrder(order){
    try {
        order.product = await getProductById(order.productId);

        delete order.productId;

        return order;
    } catch (error) {
        throw error;
    };
};
  
async function getAllOrders(){
    try {
        const {rows : orders} = await client.query(`
        SELECT * FROM orders
        LEFT JOIN order_products on orders.id = order_products."orderId";
    `);

    const newOrders = await Promise.all(orders.map(addProductsToOrder));

    return newOrders;
    } catch (error) {
        throw error;
    };
}

async function getOrderById(id){
    try {
        const { rows: orders} = await client.query(`
        SELECT * FROM orders
        INNER JOIN order_products on orders.id = order_products."orderId" AND orders.id = $1;
        `, [id]);

        const newOrders = await Promise.all(orders.map(addProductsToOrder));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderByUser(username){
    try {
        const { rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
        `, [username]);
        console.log("USER", user)

        const { rows: orders} = await client.query(`
        SELECT * FROM orders
        INNER JOIN order_products on orders.id = order_products."orderId" AND orders."userId" = $1;
        `, [user.id]);

        const newOrders = await Promise.all(orders.map(addProductsToOrder));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderByProduct(id){
    try {
        const { rows: orders} = await client.query(`
        SELECT * FROM order_products
        WHERE "productId" = $1;
    `, [id]);

        const newOrders = await Promise.all(orders.map(addProductsToOrder));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getCartByUser(id){
    try {
        const { rows: orders} = await client.query(`
        SELECT * FROM orders
        INNER JOIN order_products on orders.id = order_products."orderId" AND orders."userId" = $1
        AND status = 'created';
        `, [id]);

        const newOrders = await Promise.all(orders.map(addProductsToOrder));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    getOrderByProduct,
    getCartByUser
};