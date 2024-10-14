// src/controllers/productController.js

const prisma = require("../prismaClient");

// Helper function to generate custom product ID
const generateProductId = async () => {
    const lastProduct = await prisma.product.findFirst({
        orderBy: { id: "desc" },
    });
    if (lastProduct) {
        const lastId = lastProduct.id;
        const newId = `P${String(parseInt(lastId.slice(1)) + 1).padStart(4, "0")}`;
        return newId;
    }
    return "P0001"; // Start with P0001 if no products exist
};

// Create a new product with custom ID
exports.createProduct = async (req, res) => {
    const { name, price, categoryId } = req.body;

    if (!name || !price || !categoryId) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const id = await generateProductId();
        const product = await prisma.product.create({
            data: {
                id,
                name,
                price: parseFloat(price),
                categoryId,
            },
        });

        res.status(201).json({ product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true, // Include category information in the response
            },
        });

        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
