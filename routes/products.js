const express = require("express");
const productsRouter = express.Router();
const { isAdmin } = require('./utils')

const { getProductById, getAllProducts, createProduct, updateProduct } = require("../db/products");

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

productsRouter.post("/", isAdmin, async (req, res, next) => {
  const { name, description, price, inStock, imageURL, category } = req.body;
  try {
    const createdProduct = await createProduct({
      name,
      description,
      price,
      inStock,
      imageURL,
      category,
    });
    res.send(createdProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:productId", isAdmin, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await updateProduct({ id: productId, ...req.body });
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", isAdmin, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProducts = await destroyProduct(productId);
    res.send(deletedProducts);
  } catch (error) {
    next(error);
  }
});




module.exports = productsRouter;