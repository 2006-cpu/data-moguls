const express = require('express');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const ordersRouter = express.Router();
const { getOrderByUser } = require("../db/orders")

ordersRouter.get('/', async (req, res, next) => {
    const { username } = req.user
    try {
        const userOrders = await getOrderByUser({ username })
        res.send(userOrders)

    } catch (error) {
        console.error(error)
    }
})