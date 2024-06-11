import prisma from "../db.js";

export const getUsers = async (req, res) => {
    try {
      const allUsers = await prisma.user.findMany();
      if (!allUsers) {
        return res.status(404).json({ message: "Error al obtener los usuarios" });
      } else {
        res.status(200).json(allUsers);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" })
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    res.status(400).json(error);
  }
}