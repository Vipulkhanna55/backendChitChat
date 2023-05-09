import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;
const SALT = process.env.SALT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATA_USER_NAME = process.env.DATA_USER_NAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE = process.env.DATABASE;
const DATABASE_HOST = process.env.DATABASE_HOST;
const JWT_EXPIRY = 86400;

export default {
  SECRET,
  JWT_EXPIRY,
  PORT,
  SALT,
  DATABASE_NAME,
  DATA_USER_NAME,
  DATABASE_PASSWORD,
  DATABASE,
  DATABASE_HOST,
};
