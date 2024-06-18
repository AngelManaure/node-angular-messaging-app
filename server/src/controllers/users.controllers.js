import prisma from "../db.js";

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res
        .status(400)
        .json({ message: "el parametro query 'q' es requerido" });
    }
    const users = await prisma.user.findMany();

    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};