const express = require("express");
const router = express.Router();

const sneakersModel = require("../models/Sneaker");
const tagsModel = require("../models/Tag");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res, next) => {
  sneakersModel
    .find()
    .then(dbResults => {
      console.log(dbResults);
      res.render("products", {
        sneakers: dbResults
      });
    })
    .catch(next);
});
router.get("/sneakers/men", (req, res, next) => {
  sneakersModel
    .find({ category: "men" })
    .then(dbResults => {
      console.log("find dbresult", dbResults);
      res.render("products", {
        sneakers: dbResults
      });
    })
    .catch(next);
});
router.get("/sneakers/women", (req, res, next) => {
  sneakersModel
    .find({ category: "women" })
    .then(dbResults => {
      console.log("find dbresult", dbResults);
      res.render("products", {
        sneakers: dbResults
      });
    })
    .catch(next);
});
router.get("/sneakers/kids", (req, res, next) => {
  sneakersModel
    .find({ category: "kids" })
    .then(dbResults => {
      console.log("find dbresult", dbResults);
      res.render("products", {
        sneakers: dbResults
      });
    })
    .catch(next);
});

router.get("/one-product/:id", (req, res, next) => {
  sneakersModel
    .findById(req.params.id)
    .then(dbResults => {
      res.render("one_product", {
        sneaker: dbResults
      });
    })
    .catch(next);
});





module.exports = router;
