const express = require('express');
const router = express.Router();
const User = require('../models/user')
const user_controller = require("../controllers/userController");


router.get("/", user_controller.index);

router.get("/sign-up", user_controller.user_create_get);

router.post("/sign-up", user_controller.user_create_post) 

router.get('/join_club', user_controller.user_join_club_get)

router.post('/join_club', user_controller.user_join_club_post)


module.exports = router;
