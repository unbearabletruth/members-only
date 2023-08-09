const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.message_create_get = (req, res, next) => {
    res.render("message_form")
};

exports.message_create_post = [
    body("title", "Title should not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("text", "Message should not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
  
      const message = new Message({
        title: req.body.title,
        text: req.body.text,
        author: req.user._id,
        timestamp: new Date
      });
  
      if (!errors.isEmpty()) {
        res.render("message_form", {
          message: message,
          errors: errors.array(),
        });
        return;
      } else {
        await message.save();
        res.redirect('/');
      }
    }),
];

exports.message_delete_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).populate('author').exec()
  res.render("message_delete", { message: message })
});

exports.message_delete_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndRemove(req.params.id);
  res.redirect('/');
});