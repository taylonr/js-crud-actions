var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router.get("/products/:id", (req, res) => {
    res.send(db.get("products").find({ id: req.params.id }).value());
  });

  router.post("/products", (req, res) => {
    res.send(db.get("products").insert(req.body).write());
  });

  return router;
};
