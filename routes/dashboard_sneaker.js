const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const tagsModel = require("../models/Tag");
const sneakersModel = require("../models/Sneaker");
const uploadCloud = require("../config/cloudinary.js");




router.post("/prod-add/new-tag", (req, res, next) => {
    console.log(req.body);
    const newTag = req.body;
    console.log(newTag);
    //missing a condition if the tags already exists
    tagsModel
      .create(newTag)
      .then(() => {
        console.log("console log here", newTag);
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

  router.get("/prod-manage", (req, res, next) => {
    sneakersModel
    .find()
    .then((dbRes) => {
      res.render("products_manage", {
        sneakers: dbRes
      })
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
