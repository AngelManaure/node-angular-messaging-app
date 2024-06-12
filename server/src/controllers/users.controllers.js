import prisma from "../db.js";
import bcrypt from "bcryptjs";
import { loadOffensiveWords } from "../libs/offensiveWordsView.js";

import { containsOffensiveWord } from "../libs/offensiveWordsView.js";

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

export const updateUserRequest = async (req, res) => {
  const userId = req.user.id;
  const { username, password, email } = req.body;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "No tienes autorización para estár aquí" });
  }
  if (!username || !password || !email) {
    return res
      .status(401)
      .json({
        message: "Por favor ingresa tu nombre de usuario, email y contraseña",
      });
  }

  try {
    const userFound = await prisma.user.findUnique({
      where: {
        id: userId,
        username: username,
        email: email,
      },
    });
    if (!userFound) {
      return res
        .status(401)
        .json({ message: "Usuario a actualizar no encontrado" });
    } else {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Usuario o contraseña inválido/a" });
      } else {
        res.status(200).json(userFound);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { newUsername, newDescription, newPassword, newEmail } = req.body;

  const hasOffensiveWord =
    containsOffensiveWord(newDescription) ||
    containsOffensiveWord(newUsername) ||
    containsOffensiveWord(newEmail);

  if (hasOffensiveWord) {
    return res.status(400).json({
      message: "evita el uso de palabras que puedan ofender a los demás",
    });
  }
  try {
    const hasNewPassword = await bcrypt.hash(newPassword, 10);

    const userUpdate = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        email: newEmail,
        username: newUsername,
        password: hasNewPassword,
        description: newDescription,
      },
    });
    if (!userUpdate) {
      return res
        .status(400)
        .json({ message: "Error al actualizar datos del usuario" });
    } else {
      res.status(200).json(userUpdate);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
