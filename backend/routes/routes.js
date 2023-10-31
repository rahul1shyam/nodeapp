const express = require('express');
const router = express.Router();
const control = require("../controllers/controllers");


router.post('/register',control.register);
router.post('/login',control.login);
router.post('/addTask',control.addTask);
router.get('/removeTask/:id',control.removeTask);

module.exports = router;
