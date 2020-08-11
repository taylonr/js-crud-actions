var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router
    .route("/products")
    .get((req, res) => {
      res.send(db.get("products").value());
    })
    .post((req, res) => {
      const newProduct = req.body;
      res.send(db.get("products").insert(newProduct).write());
    });

  router
    .route("/products/:id")
    .patch((req, res) => {
      res.send(
        db.get("products").find({ id: req.params.id }).assign(req.body).write()
      );
    })
    .delete((req, res) => {
      db.get("products").remove({ id: req.params.id }).write();
      res.status(204).send();
    })
    .get((req, res) => {
      const result = db.get("products").find({ id: req.params.id }).value();
      if (result) {
        res.send(result);
      } else {
        res.status(404).send();
      }
    });

  return router;
};
