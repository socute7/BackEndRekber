// src/utils/generateToken.js

const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

module.exports = generateToken;
