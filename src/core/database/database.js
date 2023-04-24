import { Sequelize } from "sequelize";
import logger from "../helper/logger.js";
import databaseConfig from "../../../config/config.js";

const sequelize = new Sequelize(
  databaseConfig.DATABASE_NAME,
  databaseConfig.DATA_USER_NAME,
  databaseConfig.DATABASE_PASSWORD,
  {
    host: databaseConfig.DATABASE_HOST,
    dialect: databaseConfig.DATABASE
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(logger.dataBaseLogs().success);
  })
  .catch(() => {
    console.log(logger.dataBaseLogs().reject);
  });

export default sequelize;
