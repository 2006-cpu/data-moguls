const express = require("express");
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    getOrderByProduct,
    getCartByUser,
} = require("../db");
const {
    requireAdmin,
    requireUser,
} = require("./utils");

ordersRouter.get("/", requireAdmin, async (req, res, next) => {
    try {
        const allorders = await getAllOrders();

        res.send(allorders);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

ordersRouter.get("/cart", requireUser, async (req, res, next) => {
    const { productId } = req.params;
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



module.exports = ordersRouter;