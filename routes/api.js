const express = require("express");
const router = express.Router();
const productsRouter = require("./products");

module.exports = function (db) {
  router.use(productsRouter(db));

  return router;
};
