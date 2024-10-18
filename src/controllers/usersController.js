const prisma = require("../prismaClient");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
  
