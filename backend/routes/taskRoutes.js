const express = require('express');
const router = express.Router();

const taskControl = require("../controllers/taskControllers");


router.post('/addTask',taskControl.addTask);
router.get('/removeTask/:id',taskControl.removeTask);

module.exports = router;