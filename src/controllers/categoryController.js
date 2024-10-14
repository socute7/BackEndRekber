// src/controllers/categoryController.js

const prisma = require("../prismaClient");

// Helper function to generate custom category ID
const generateCategoryId = async () => {
    const lastCategory = await prisma.category.findFirst({
        orderBy: { id: "desc" },
    });
    if (lastCategory) {
        const lastId = lastCategory.id;
        const newId = `C${String(parseInt(lastId.slice(1)) + 1).padStart(4, "0")}`;
        return newId;
    }
    return "C0001"; // Start with C0001 if no categories exist
};

// Create a new category with custom ID
exports.createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    try {
        const id = await generateCategoryId();
        const category = await prisma.category.create({
            data: {
                id,
                name,
            },
        });

        res.status(201).json({ category });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
