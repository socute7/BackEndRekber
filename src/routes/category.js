// src/routes/category.js

const express = require("express");
const { createCategory, getAllCategories } = require("../controllers/categoryController");

const router = express.Router();

// Create a new category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

module.exports = router;
