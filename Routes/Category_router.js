const express = require('express');
const categoryController = require('../Controller/Category_Controller');

const router = express.Router();

// Define a GET route for fetching all categories
router.get('/get', categoryController.getAllCategories);

// Define a POST route for creating a new category
router.post('/', categoryController.createCategory);

module.exports = router;
