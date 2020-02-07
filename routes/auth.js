const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs"); // intro to bcrypt hashing algorithm https://www.youtube.com/watch?v=O6cmuiTBZVs


router.get("/signup", (req, res, next) => {
    res.render("signup");
  });
  
  router.get("/signin", (req, res) => {
    res.render("signin");
  });


router.post("/signup", (req, res, next) => {
    const user = req.body; // req.body contains the submited informations (out of post request)
  
    // if (req.file) user.avatar = req.file.secure_url;
  
    if (!user.email || !user.password) {
      res.redirect("/auth/signup");
      return;
    } else {
      userModel
        .findOne({ email: user.email })
        .then(dbRes => {
          if (dbRes) {
            return res.redirect("/auth/signup"); //
          }
  
          const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
          const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
          user.password = hashed; // new user is ready for db
      
          userModel.create(user).then(() => res.redirect("/auth/signin"));
          // .catch(dbErr => console.log(dbErr));
        })
        .catch(next);
    }
  });


  router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.password) {
      // one or more field is missing
      return res.redirect("/auth/signin");
    }
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (!dbRes) {
          // no user found with this email
          return res.redirect("/auth/signin");
        }
        // user has been found in DB !
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          // encryption says : password match success
          const { _doc: clone } = { ...dbRes }; // make a clone of db user
          delete clone.password; // remove password from clone
          // console.log(clone);
          req.session.currentUser = clone; // user is now in session... until session.destroy
          return res.redirect("/prod-manage");
        } else {
          // encrypted password match failed
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
