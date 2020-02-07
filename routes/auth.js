const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
/*const uploader = require("./../config/cloudinary");*/

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signup", (req, res, next) => {
  const user = req.body; // req.body contains the submited informations (out of post request)
  console.log("reqbody", req.body);
  if (!user.email || !user.password) {
    res.redirect("/auth/signup");
    return;
  } else {
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (dbRes) {
          //req.flash("error", "sorry, email is already taken :/");
          return res.redirect("/auth/signup");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(user.password, salt);
        user.password = hashed;
        userModel.create(user).then(() => res.redirect("/auth/signin"));
      })
      .catch(next);
  }
});

router.post("/signin", (req, res, next) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.redirect("/auth/signin");
  }

  userModel
    .findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        return res.redirect("/auth/signin");
      }
      // user has been found in DB !
      if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };
        delete clone.password;
        req.session.currentUser = clone;
        return res.redirect("/products_manage");
      } else {
        return res.redirect("/auth/signin");
      }
    })
    .catch(next);
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.locals.isLoggedIn = undefined;
    res.locals.isAdmin = undefined;
    res.redirect("/auth/signin");
  });
});

module.exports = router;
