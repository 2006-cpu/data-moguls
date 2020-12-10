const { client } = require("./index.js");

const { getOrderById } = require('./orders');

async function createOrderProduct({ productId, orderId, price, quantity }) {
    try {
        const { rows: [order_product] } = await client.query(`
      INSERT INTO order_products ("productId", "orderId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING * ;
    `, [productId, orderId, price, quantity]);
        return order_product;
    } catch (error) {
        throw error;
    }
}

async function getOrderProductById(id) {
    try {
        const { rows: [order_product] } = await client.query(`
      SELECT * FROM order_products
      WHERE id = $1;
    `, [id]);
        return order_product;
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder({ orderId, productId, price, quantity }) {
    try {
        const { rows: [orderProduct] } = await client.query(`
            SELECT * FROM order_products
            WHERE "orderId" = $1
            AND "productId" = $2;
        `, [orderId, productId]);

        if (orderProduct) {
            await updateOrderProduct({
                id: orderProduct.id,
                price: (price * (orderProduct.quantity + 1)),
                quantity: (orderProduct.quantity + 1)
            });
        } else {
            await createOrderProduct({
                orderId,
                productId,
                price,
                quantity
            })
        };

        const newOrder = getOrderById(orderId);

        return newOrder;
    } catch (error) {
        throw error;
    }
}

async function updateOrderProduct({ id, ...fields }) {
    try {
        const fieldKeys = Object.keys(fields);

        const setString = fieldKeys
            .map((fieldName, index) => {
                return `"${fieldName}"=$${index + 1}`;
            })
            .join(", ");

        const setValues = Object.values(fields);
        setValues.push(id);

        if (fieldKeys.length === 0) {
            return;
        }

        const { rows: [order_product] } = await client.query(`
            UPDATE order_products
            SET ${setString}
            WHERE id = $${setValues.length}
            RETURNING *;
        `, setValues);

        return order_product;
    } catch (error) {
        throw error;
    }
}

async function destroyOrderProduct(id) {
    try {
        const {
            rows: [routine_activity],
        } = await client.query(
            `
        DELETE
        FROM order_products
        WHERE id = $1
        RETURNING *;
        `,
            [id]
        );

        return routine_activity;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct,
    createOrderProduct,
};