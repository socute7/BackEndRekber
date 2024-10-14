// src/routes/product.js

const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

module.exports = router;
