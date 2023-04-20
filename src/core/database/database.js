import { Sequelize } from "sequelize";
import logger from "../helper/logger.js";
const sequelize = new Sequelize("ChitChat", "postgres", "newPassword", {
  host: "localhost",
  dialect: "postgres",
});
sequelize
  .authenticate()
  .then(() => {
    console.log(logger.dataBaseLogs().success);
  })
  .catch(() => {
    console.log(logger.dataBaseLogs().reject);
  });

export default sequelize;
