import dotenv from 'dotenv/config'

export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.JWT_SECRET