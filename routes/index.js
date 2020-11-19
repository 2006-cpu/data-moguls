const apiRouter = require('express').Router();

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

module.exports = apiRouter;
