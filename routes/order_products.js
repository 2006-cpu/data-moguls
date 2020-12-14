const express = require("express");
const orderProductsRouter = express.Router();
const { removeOrderFromProduct } = require('../db/orderProducts')
const { requireUser } = require("./utils");

orderProductsRouter.delete("/:orderId/:productId", requireUser, async (req, res, next) => {
    const { orderId, productId } = req.params;
    try {
        const deleteProductFromOrder = await removeOrderFromProduct({ orderId, productId })
        res.send(deleteProductFromOrder)

    } catch (error) {
        next(error)
    }
})

module.exports = orderProductsRouter