const express = require("express");
const contactForm = require('../controllers/contact-controller');
const validate = require("../middlewares/validate-middleware");
const contactSchema = require('../validators/contact-validator');

// Create a new router instance
const router = express.Router();

// Define a GET route for the root path
router.route('/contact').post(validate(contactSchema),  contactForm);

// Export the router
module.exports = router;
