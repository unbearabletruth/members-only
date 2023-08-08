/*const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    res.render("index", { user: req.user });
});

exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("sign-up-form")
});

exports.user_create_post = asyncHandler(async (req, res, next) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        membership_status: "user"
      });
    await user.save();
    res.redirect("/");
});*/


