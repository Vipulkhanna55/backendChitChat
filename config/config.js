import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;
const SALT = process.env.SALT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATA_USER_NAME = process.env.DATA_USER_NAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE = process.env.DATABASE;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const JWT_EXPIRY = process.env.JWT_EXPIRY;
const MAIL_EMAIL = process.env.MAIL_EMAIL;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_SERVICE = process.env.MAIL_SERVICE;

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
  DATABASE_PORT,
  MAIL_EMAIL,
  MAIL_PASSWORD,
  EMAIL_FROM,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SERVICE,
};
