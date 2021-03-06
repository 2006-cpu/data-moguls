
const express = require("express");
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getCartByUser,
    cancelOrder,
    updateOrder,
} = require("../db");
const {
    requireAdmin,
    requireUser,
} = require("./utils");

const { addProductToOrder } = require("../db/orderProducts");

ordersRouter.get("/", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const allorders = await getAllOrders();

        res.send(allorders);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
    try {
        const cart = await getCartByUser(req.user.id);

        if (cart) {
            res.send(cart);
        } else {
            next({ message: "failed to pull cart." });
            return;
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

ordersRouter.get("/:orderId", async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await getOrderById(orderId);

        res.send(order);
    } catch (error) {
        throw error;
    }
})

ordersRouter.post("/", requireUser, async (req, res, next) => {

    try {
        const order = await createOrder({
            status: "created",
            userId: req.user.id,
        });
        if (order) {
            res.send(order);
        } else {
            next({ message: "failed to create order." });
            return;
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {

    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await updateOrder(orderId, { status });
        res.send(order);
    } catch (error) {
        next(error);
    }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await cancelOrder(orderId);

        res.send(order);
    } catch (error) {
        next(error);
    }
});

ordersRouter.post("/:orderId/products", requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, price, quantity } = req.body;

    try {
        const orderProduct = await addProductToOrder({
            orderId,
            productId,
            price,
            quantity
        });

        res.send(orderProduct);
    } catch (error) {
        next(error);
    }
}
);

module.exports = ordersRouter;
