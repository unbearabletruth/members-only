const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const { body, validationResult } = require("express-validator");
require('dotenv').config()

exports.index = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate('author').exec()
    res.render("index", { 
        user: req.user,
        messages: messages
    });
});

exports.user_create_get = (req, res, next) => {
    res.render("sign-up-form")
};

exports.user_create_post = [
    body("first_name", "First name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("last_name", "Last name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body('username')
        .trim()
        .isLength({ max: 12 })
        .withMessage("Username should not exceed 12 characters")
        .escape()
        .custom(async value => {
        const user = await User.findOne({ username: value });
        if (user) {
            throw new Error('Username already in use');
        }
        }),
    body("password", "Password must contain at least 5 characters")
        .trim()
        .isLength({ min: 5 })
        .escape(),
    body('password_confirm', "Passwords do not match").custom((value, { req }) => {
        return value === req.body.password;
        }),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if(err){
                console.log('crypting fail')
                return
            } else {
                const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPassword,
                membership_status: "user"
                });
                if (!errors.isEmpty()) {
                    res.render("sign-up-form", {
                      user: user,
                      errors: errors.array(),
                    });
                    return;
                }else {
                    await user.save();
                    res.redirect("/");
                  }
            }
        });
        
    })
];

exports.user_join_club_get = (req, res, next) => {
    res.render("join_club")
};

exports.user_join_club_post = asyncHandler(async (req, res, next) => {
    if (req.body.club_password !== process.env.CLUB_PASSWORD) {
        res.render("join_club", {
            error: "Wrong password!",
        });
        return;
    }else {
        await User.findByIdAndUpdate(req.user._id, { membership_status: 'member' });
    }
})


