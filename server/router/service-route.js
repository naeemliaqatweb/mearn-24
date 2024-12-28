const express = require("express");
const serviceController = require('../controllers/service-controller');

// Create a new router instance
const router = express.Router();

// Define a GET route for the root path
router.route('/service').get(serviceController);

// Export the router
module.exports = router;
