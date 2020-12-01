<<<<<<< HEAD
const {client} = require('./client');
const { getProductById } = require('./products');
=======
const { client } = require('./client');
>>>>>>> dev

async function createOrder({ status, userId }) {
    const { rows: [order] } = await client.query(`
        INSERT INTO orders(status, "userId")
        VALUES ($1, $2)
        RETURNING *;
    `, [status, userId]);

    return order;
};

<<<<<<< HEAD
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
=======
async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM orders;
    `)
        return orders
>>>>>>> dev
    } catch (error) {
        throw error;
    };
}

<<<<<<< HEAD
async function getOrderById(id){
    try {
        const { rows: orders} = await client.query(`
=======


async function getOrderById({ id }) {
    try {
        const { rows: [order] } = await client.query(`
>>>>>>> dev
        SELECT * FROM orders
        INNER JOIN order_products on orders.id = order_products."orderId" AND orders.id = $1;
        `, [id]);

<<<<<<< HEAD
        const newOrders = await Promise.all(orders.map(addProductsToOrder));
=======
        const { rows: [products] } = await client.query(`
        SELECT * FROM order_products
        WHERE "orderId" = $1;
        `, [order.id])

        order.products = products;
>>>>>>> dev

        return newOrders;
    } catch (error) {
        throw error;
    };
};

<<<<<<< HEAD
async function getOrderByUser(username){
=======
async function getOrderByUser({ username }) {
>>>>>>> dev
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
        `, [username]);
        console.log("USER", user)

        const { rows: orders} = await client.query(`
        SELECT * FROM orders
        INNER JOIN order_products on orders.id = order_products."orderId" AND orders."userId" = $1;
        `, [user.id]);

<<<<<<< HEAD
        const newOrders = await Promise.all(orders.map(addProductsToOrder));
=======
        const order = await getOrderById({ id: user.id });
>>>>>>> dev

        return newOrders;
    } catch (error) {
        throw error;
    };
};

<<<<<<< HEAD
async function getOrderByProduct(id){
=======
async function getOrderByUserId({ id }) {
    try {
        const { rows } = await client.query(`
        SELECT * FROM orders
        WHERE "userId" = $1;
        `, [id]);

        const orders = rows;


        return orders;
    } catch (error) {
        throw error;
    };
};

async function getOrderByProduct({ id }) {
>>>>>>> dev
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM order_products
        WHERE "productId" = $1;
    `, [id]);

<<<<<<< HEAD
        const newOrders = await Promise.all(orders.map(addProductsToOrder));

        return newOrders;
=======
        return orders;
>>>>>>> dev
    } catch (error) {
        throw error;
    };
};

<<<<<<< HEAD
async function getCartByUser(id){
=======
async function getCartByUser(id) {
>>>>>>> dev
    try {
        const { rows: orders } = await client.query(`
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

async function updateOrder({ id, ...fields }) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    const objValues = Object.values(fields)
    if (setString.length === 0) {
        return;
    }
    objValues.push(id)
    try {
        const { rows: [order] } = await client.query(`
        UPDATE orders
        SET ${setString}
        WHERE id = $${objValues.length}
        RETURNING *;
      `, objValues);
        return order;
    } catch (error) {
        throw error;
    }
}

async function completeOrder({ id }) {
    try {
        const { rows: [order] } = await client.query(`
        UPDATE orders
        SET status = 'completed'
        WHERE id = $1
        RETURNING *;
        `, [id])
        return order

    } catch (error) {
        throw error
    }
}

async function cancelOrder(id) {
    try {
        const { rows: [order] } = await client.query(`
        UPDATE orders
        SET status = 'cancel'
        WHERE id = $1
        RETURNING *;
        `, [id])
        return order
    } catch (error) {
        throw error
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    getOrderByProduct,
    getCartByUser,
    getOrderByUserId,
    updateOrder,
    cancelOrder,
    completeOrder
};