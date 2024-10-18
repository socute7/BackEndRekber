const express = require("express");
const { getAllUsers, getUserById, getCurrentUser } = require("../controllers/usersController");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

router.get("/:id", getUserById);

module.exports = router;
