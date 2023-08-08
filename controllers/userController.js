const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const { body, validationResult } = require("express-validator");

exports.index = (req, res, next) => {
    res.render("index", { user: req.user });
};

exports.user_create_get = (req, res, next) => {
    res.render("sign-up-form")
};

exports.user_create_post = asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if(err){
            console.log('crypting fail')
            return
        } else {
            console.log('in creation')
            const user = new User({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              password: hashedPassword,
              membership_status: "user"
            });
            await user.save();
            res.redirect("/");
        }
    });
});


