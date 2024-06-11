import jwt from "jsonwebtoken";

import { SECRET } from "../config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          reject(err)
        }else {
            resolve(token)
        }
      }
    );
  });
}