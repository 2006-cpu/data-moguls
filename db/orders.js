const {client} = require('./client');

async function createOrder({ status, userId }) {
    const { rows: [order] } = await client.query(`
        INSERT INTO orders(status, "userId")
        VALUES ($1, $2)
        RETURNING *;
    `, [status, userId]);

    return order;
};

async function addProductsToOrderObj(order){
    try {
        const {rows: products} = await client.query(`
            SELECT products.id, products.name, products.price, order_products.quantity, order_products.price AS "totalProductPrice", products."inStock"
            FROM order_products
            JOIN products on order_products."productId" = products.id AND "orderId" = $1;
        `, [order.id]);

        order.products = products;

        return order;
    } catch (error) {
        throw error;
    };
};
  
async function getAllOrders(){
    try {
        const {rows : orders} = await client.query(`
            SELECT * FROM orders;
        `);

        const newOrders = await Promise.all(orders.map(addProductsToOrderObj));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderById(id){
    try {
        const { rows: [order]} = await client.query(`
            SELECT * FROM orders
            WHERE orders.id = $1;
        `, [id]);

        const newOrders = await addProductsToOrderObj(order);

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderByUser(username){
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE username = $1;
        `, [username]);

        const { rows: [order]} = await client.query(`
            SELECT * FROM orders
            WHERE orders."userId" = $1;
        `, [user.id]);

        const newOrders = await addProductsToOrderObj(order);

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderByProduct(id){
    try {
        const allOrders = await getAllOrders();
        console.log("ALL ORDERS?", allOrders)

        const newOrders = allOrders.filter(order => {
            let result = false;
            order.products.map(product => {
                if(product.id === id){
                    result = true;
                };
            });

            if (result){
                return order;
            };
        });

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getCartByUser(id){
    try {
        const { rows: [order] } = await client.query(`
        SELECT * FROM orders
        WHERE orders."userId" = $1
        AND status = 'created';
        `, [id]);

        const newOrders = await addProductsToOrderObj(order);

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
    updateOrder,
    cancelOrder,
    completeOrder
};