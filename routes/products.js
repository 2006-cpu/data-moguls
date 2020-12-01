const express = require("express");
const productsRouter = express.Router();

const { getProductById, getAllProducts, createProduct } = require("../db");
const ordersRouter = require("./orders");

productsRouter.get("/", async (req, res, next) => {
  try {
    const allProducts = await getAllProducts();

    res.send(allProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);

    if (product) {
      res.send(product);
    } else {
      next({ message: "failed to pull product." });
      return;
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});




module.exports = productsRouter;