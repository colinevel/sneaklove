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

router.get("/products_manage", (req, res) => {
  res.render("products_manage");
});

router.get("/prod-add", (req, res, next) => {
  tagsModel
  .find()
  .then(dbResults => {
    console.log(dbResults);
    res.render("products_add", {
      tags: dbResults
    });
  })
  .catch(next);
});

// CREATE SNEAKERS

router.post("/prod-add", (req, res, next) => {
  const { name, ref, sizes, description, price, category, id_Tags } = req.body;
  sneakersModel
    .create({
      name,
      ref,
      sizes,
      description,
      price,
      category,
      id_Tags
    })
    .then(() => {
      
      res.redirect("/sneakers/collection");
    })
    .catch(next);
});

// CREATE NEW TAGS
router.post("/prod-add/new-tag", (req, res, next) => {
  const {name} = req.body;
  tagsModel
  .create({
    name
  })
  .then(() => {
    
    res.redirect("/prod-add");
  })
  .catch(next);
});

// DISPLAY MEN SHOES

router.get("/sneakers/men", (req, res, next) => {
  sneakersModel
  .find({category: "men"})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products", {
      sneakers: dbRes
    })
  })
  .catch(next);
});

// DISPLAY WOMEN SHOES

router.get("/sneakers/women", (req, res, next) => {
  sneakersModel
  .find({category: "women"})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products", {
      sneakers: dbRes
    })
  })
  .catch(next);
});

// DISPLAY KIDS SHOES

router.get("/sneakers/kids", (req, res, next) => {
  sneakersModel
  .find({category: "kids"})
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products", {
      sneakers: dbRes
    })
  })
  .catch(next);
});
  
// DISPLAY MANAGE PRODUCTS
router.get("/prod-manage", (req, res, next) => {
  sneakersModel
  .find()
  .then((dbRes) => {
    console.log(dbRes);
    res.render("products_manage", {
      sneakers: dbRes
    })
  })
  .catch(next);
});



router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});





module.exports = router;
