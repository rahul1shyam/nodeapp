const express = require('express');
const router = express.Router();

const taskControl = require("../controllers/taskControllers");
const { auth } = require('../controllers/auth');


router.post('/addTask',auth,taskControl.addTask);
router.delete('/removeTask/:id',auth,taskControl.removeTask);
router.get('/getTask',auth,taskControl.getTask);

module.exports = router;