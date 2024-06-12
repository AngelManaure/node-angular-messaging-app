import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "autorización denegada" });
  } else {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      } else {
        req.user = user;

        next();
      }
    });
  }
};