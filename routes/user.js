let express = require('express');
let router = express.Router();
let user_controller = require('../controllers/user');

// Login user
router.post('/login', user_controller.login);

// Register user
router.post('/register', user_controller.register);

module.exports = router;
