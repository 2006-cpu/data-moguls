const { client } = require('./client');

async function createOrder({ status, userId }) {
    const { rows: [order] } = await client.query(`
        INSERT INTO orders(status, "userId")
        VALUES ($1, $2)
        RETURNING *;
    `, [status, userId]);

    return order;
};

async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM orders;
    `)
        return orders
    } catch (error) {
        throw error;
    };
}



async function getOrderById({ id }) {
    try {
        const { rows: [order] } = await client.query(`
        SELECT * FROM orders
        WHERE id = $1;
        `, [id]);

        const { rows: [products] } = await client.query(`
        SELECT * FROM order_products
        WHERE "orderId" = $1;
        `, [order.id])

        order.products = products;

        return order;
    } catch (error) {
        throw error;
    };
};

async function getOrderByUser({ username }) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1;
        `, [username]);

        const order = await getOrderById({ id: user.id });

        return order;
    } catch (error) {
        throw error;
    };
};

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
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM order_products
        WHERE "productId" = $1;
    `, [id]);

        return orders;
    } catch (error) {
        throw error;
    };
};

async function getCartByUser(id) {
    try {
        const { rows: orders } = await client.query(`
        SELECT * FROM orders
        WHERE "userId" = $1
        AND status = 'created';
        `, [id]);

        return orders;
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

}

async function cancelOrder(id) {
    try {
        const { rows: [order] } = await client.query(`
        UPDATE orders
        SET status = completed
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
};