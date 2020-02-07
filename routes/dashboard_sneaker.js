const sneakersModel = require("../models/Sneaker");
const tagsModel = require("../models/Tag");
const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploadCloud = require("../config/cloudinary.js");


router.get("/prod-manage", (req, res, next) => {
  sneakersModel
    .find()
    .then(dbRes => {
      console.log(dbRes);
      res.render("products_manage", {
        sneakers: dbRes
      });
    })
    .catch(next);
});

router.get("/product-edit/:id", (req, res, next) => {
  Promise.all([
    sneakersModel.findById(req.params.id).populate("Tag"),
    tagsModel.find()
  ])
    .then(dbRes => {
      console.log();
      var women = false;
      var men = false;
      var kids = false;
      if (dbRes[0].category == "women") women = true;
      if (dbRes[0].category == "men") men = true;
      if (dbRes[0].category == "kids") kids = true;
      res.render("product_edit", {
        sneaker: dbRes[0],
        tags: dbRes[1],
        women,
        men,
        kids
      });
    })
    .catch(next);
});
router.post("/product-edit/:id", (req, res, next) => {
  sneakersModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/prod-manage");
    })
    .catch(next);
});

router.post("/prod-add/new-tag", (req, res, next) => {
  console.log("new tag ", req.body);

  const newTag = req.body;
  console.log(newTag);
  //missing a condition if the tags already exists
  tagsModel
    .create(newTag)
    .then(() => {
      res.redirect("/prod-add");
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
      res.redirect("prod-manage");
    })
    .catch(next);
});

router.get("/product-delete/:id", (req, res, next) => {
    sneakersModel
      .findByIdAndDelete(req.params.id)
      .then(dbRes => {
        console.log("this id has to be deleted", dbRes);
        res.redirect("/prod-manage")
      })
      .catch(next);
  });

module.exports = router;
