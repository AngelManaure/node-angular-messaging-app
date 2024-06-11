import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createAccessToken } from "../libs/jwt.js";
import { containsOffensiveWord } from "../libs/offensiveWordsView.js";
import { SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, username, password, description } = req.body;

    if (!email || !username || !password || !description) {
        return res.status(400).json({ message: "Campos incompletos" });
    }

    const hasOffensiveWord = containsOffensiveWord(email) || containsOffensiveWord(description) || containsOffensiveWord(username);

    if (hasOffensiveWord) {
      return res.status(400).json({ message: "evita el uso de palabras que puedan ofender a los demás" });
    }
    
    try {
    const userEmailFound = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    const userUsernameFound = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (userEmailFound) {
        return res.status(400).json(["Este correo ya está en uso"])
    }
    if (userUsernameFound) {
        return res.status(400).json(["Este nombre de usuario ya esta en uso"])
    }
      const hasPassword = await bcrypt.hash(password, 10);

      const userCreated = await prisma.user.create({
        data: {
          username,
          email,
          password: hasPassword,
          description: description,
        },
      });
      if (!userCreated) {
          return res.status(400).json({ error: "Ocurrió un error al crear el usuario" })
      } else {
        const token = await createAccessToken({ id: userCreated.id });

        res.cookie("token", token);
        res.status(200).json({
          id: userCreated.id,
          username: userCreated.username,
          email: userCreated.email,
          description: userCreated.description,
        });
      }
    }
   catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!userFound) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña inválido/a" });
    } else {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Usuario o contraseña inválido/a" });
      } else {
        const token = await createAccessToken({ id: userFound.id });

        res.cookie("token", token);
        res.status(200).json({
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verify = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  } else {
    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: "No autorizado" });
      } else {
        const userFound = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });
        if (!userFound) {
          return res.status(401).json({ message: "No autorizado" });
        } else {
          res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
          });
        }
      }
    });
  }
};