const express = require("express");
const AuthController = require('../controllers/auth-controller');
const {signupSchema , signinSchema} = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require("../middlewares/auth-middleware");

// Create a new router instance
const router = express.Router();

// Define a GET route for the root path
router.route('/').get(AuthController.home);

router.route('/register').post( validate(signupSchema),  AuthController.register);
router.route('/login').post( validate(signinSchema) , AuthController.login);
router.route('/user').get( authMiddleware , AuthController.user);


// Export the router
module.exports = router;
