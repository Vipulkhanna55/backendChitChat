import { Sequelize } from "sequelize";
import {logger} from "../helper";
import databaseConfig from "../../../config/config.js";

const sequelize = new Sequelize(
  databaseConfig.DATABASE_NAME,
  databaseConfig.DATA_USER_NAME,
  databaseConfig.DATABASE_PASSWORD,
  {
    host: databaseConfig.DATABASE_HOST,
    dialect: databaseConfig.DATABASE,
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connected successfully");
  })
  .catch(() => {
    logger.error("Error in connection with database");
  });

export default sequelize;
