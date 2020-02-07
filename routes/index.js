const express = require("express");
const router = express.Router();

const sneakersModel = require("../models/Sneaker");
const tagsModel = require("../models/Tag");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

// GET ALL COLLECTIONS

router.get("/sneakers/collection", (req, res, next) => {
  Promise.all([sneakersModel.find(), tagsModel.find()])
    .then(dbResults => {
      res.render("products", {
        sneakers: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});

router.get("/sneakers/men", (req, res, next) => {
  Promise.all([sneakersModel.find({category: "men"}), tagsModel.find()])
    .then(dbResults => {
      res.render("products", {
        sneakers: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});


router.get("/sneakers/women", (req, res, next) => {
  Promise.all([sneakersModel.find({category: "women"}), tagsModel.find()])
    .then(dbResults => {
      res.render("products", {
        sneakers: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});

router.get("/sneakers/kids", (req, res, next) => {
  Promise.all([sneakersModel.find({category: "kids"}), tagsModel.find()])
    .then(dbResults => {
      res.render("products", {
        sneakers: dbResults[0],
        tags: dbResults[1]
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
