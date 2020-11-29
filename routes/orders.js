const express = require('express');
const ordersRouter = express.Router();
const { getOrderByUser, getCartByUser, createOrder } = require("../db/orders")
const { requireUser } = require('../db/utils')

ordersRouter.get('/', async (req, res, next) => {
    const { username } = req.user
    try {
        const userOrders = await getOrderByUser({ username })
        res.send(userOrders)

    } catch (error) {
        console.error(error)
    }
})

ordersRouter.get('/cart', async (req, res, next) => {
    const { username } = req.user
    try {

    } catch (error) {
        console.error(error)
    }
})

ordersRouter.get('/users/:userId/orders', requireUser, async (req, res, next) => {
    try {
        const { username } = req.params
        if (req.user.username === username) {
            const userOrders = await getOrderByUser({ username })
            return res.send(userOrders)
        }
    } catch (error) {
        next(error)
    }
})

ordersRouter.post('/', async (req, res, next) => {
    const { status } = req.params
    try {

        const createAnOrder = await createOrder({ status, userId })

    } catch (error) {
        console.error(error)
    }
});
