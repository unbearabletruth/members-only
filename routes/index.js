const express = require('express');
const router = express.Router();
const User = require('../models/user')
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/", user_controller.index);

router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post) 

router.get('/join_club', user_controller.user_join_club_get)
router.post('/join_club', user_controller.user_join_club_post)

router.get('/is_admin', user_controller.user_is_admin_get)
router.post('/is_admin', user_controller.user_is_admin_post)

router.get('/new_message', message_controller.message_create_get);
router.post('/new_message', message_controller.message_create_post);

module.exports = router;
