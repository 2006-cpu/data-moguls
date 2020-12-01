const client = require('./client')

async function getOrderProductById(id) {
    try {
        const { rows: [orderProduct] } = await client.query(`
        SELECT *
        FROM order_products
        WHERE id=$1
        `, [id]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder({
    orderId,
    productId,
    price,
    quantity }) {
    try {
        const { rows: [productOrder] } = await client.query(`
        INSERT INTO order_products("orderId", "productId", price, quantity)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [orderId, productId, price, quantity]);
        return productOrder
    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({ id, price, quantity }) {
    try {
        const { rows: [orderProduct] } = await client.query(`
                UPDATE order_products
                SET price = $2, quantity = $3
                WHERE id = $1
                RETURNING *;
          `, [id, price, quantity]);
        return orderProduct;
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProduct(id) {
    try {
        const { rows: [orderProduct] } = await client.query(`
                DELETE 
                FROM order_products
                WHERE id = $1
                RETURNING *;
                `, [id]);
        return orderProduct
    } catch (error) {
        throw error
    }
}

module.exports = {
    client,
    getOrderProductById,
    updateOrderProduct,
    destroyOrderProduct,
    addProductToOrder,
}