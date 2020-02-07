const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const sneakersModel = require("../models/Sneaker");
const tagsModel = require("../models/Tag");

router.get(["/","/home"], (req, res) => {
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



router.post("/prod-add/new-tag", (req, res, next) => {
  console.log(req.body);

  const newTag = req.body;
  console.log(newTag);
  //missing a condition if the tags already exists
  tagsModel
    .create(newTag)
    .then(() => {
      res.redirect("/products_add");
    })
    .catch(next);
});

router.get("/prod-add", (req, res, next) => {
  tagsModel
    .find()
    .then(dbResults => {
      res.render("products_add", {
        tags: dbResults
      });
    })
    .catch(next);
});
router.post("/prod-add", uploadCloud.single("image"), (req, res, next) => {
  const sneaker = req.body;
  if (req.file) sneaker.image = req.file.secure_url;
  sneakersModel
    .create(sneaker)
    .then(() => {
      res.redirect("products_manage");
    })
    .catch(next);
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
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




module.exports = router;
