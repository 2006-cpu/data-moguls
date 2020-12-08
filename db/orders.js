const { client } = require('./client');

async function createOrder({ status, userId }) {
    const { rows: [order] } = await client.query(`
        INSERT INTO orders(status, "userId")
        VALUES ($1, $2)
        RETURNING *;
    `, [status, userId]);

    return order;
};

async function addProductsToOrderObj(order) {
    try {
        const { rows: products } = await client.query(`
            SELECT products.id, products.name, products.price, products."imageURL", order_products.quantity, order_products.price AS "totalProductPrice", products."inStock"
            FROM order_products
            JOIN products on order_products."productId" = products.id AND "orderId" = $1;
        `, [order.id]);

        order.products = products;

        return order;
    } catch (error) {
        throw error;
    };
};

async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
            SELECT * FROM orders;
        `);

        const newOrders = await Promise.all(orders.map(addProductsToOrderObj));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderById(id) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT * FROM orders
            WHERE orders.id = $1;
        `, [id]);

        if (!order) {
            return {
                name: 'NoOrderFound',
                message: `There are no orders with id: ${id}`
            };
        };

        const newOrder = await addProductsToOrderObj(order);

        return newOrder;
    } catch (error) {
        throw error;
    };
};

async function getOrdersByUser(id) {
    try {

        const { rows: orders } = await client.query(`
            SELECT * FROM orders
            WHERE orders."userId" = $1;
        `, [id]);

        if (!orders) {
            return {
                name: 'NoOrderFoundForUser',
                message: `There are no orders found for user with id: ${id}`
            };
        };

        const newOrders = await Promise.all(orders.map(addProductsToOrderObj));

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getOrderByProduct(id) {
    try {
        const allOrders = await getAllOrders();

        const newOrders = allOrders.filter(order => {
            let result = false;
            order.products.map(product => {
                if (product.id === id) {
                    result = true;
                };
            });

            if (result) {
                return order;
            };
        });

        if (newOrders.length === 0) {
            return {
                name: 'NoOrderWithProduct',
                message: `There are no orders with product id: ${id}.`
            };
        };

        return newOrders;
    } catch (error) {
        throw error;
    };
};

async function getCartByUser(id) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT * FROM orders
            WHERE orders."userId" = $1
            AND status = 'created';
        `, [id]);

        if (!order) {
            return {
                name: 'NoOrder',
                message: `There is no order with the id ${id} and that is still pending.`
            };
        };

        const newOrder = await addProductsToOrderObj(order);

        return newOrder;
    } catch (error) {
        throw error;
    };
};
const updateOrder = async ({ id, ...fields }) => {
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

    try {
        const {
            rows: [order],
        } = await client.query(
            `
            UPDATE orders
            SET ${setString}
            WHERE id = $${setValues.length}
            RETURNING *;
            `,
            setValues
        );
        return order;
    } catch (error) {
        throw error;
    }
};

async function completeOrder(id) {
    try {
        const { rows: [order] } = await client.query(`
            UPDATE orders
            SET STATUS = 'completed'
            WHERE id = $1
            RETURNING *;
        `, [id]);

        if (!order) {
            return {
                name: 'NoOrderFound',
                message: `There are no orders with id: ${id}.`
            };
        };

        const newOrder = await addProductsToOrderObj(order);

        return newOrder;
    } catch (error) {
        throw error;
    };
};

const cancelOrder = async (id) => {
    try {

        const {
            rows: [order],
        } = await client.query(
            `
      UPDATE orders
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
  `,
            [id]
        );
        return order;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUser,
    getOrderByProduct,
    getCartByUser,
    updateOrder,
    completeOrder,
    cancelOrder
};
