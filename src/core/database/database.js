import { Sequelize } from "sequelize";
import { logger } from "../helper";
import databaseConfig from "../../../config/config.js";

const sequelize = new Sequelize(
  databaseConfig.DATABASE_NAME,
  databaseConfig.DATA_USER_NAME,
  databaseConfig.DATABASE_PASSWORD,
  {
    host: databaseConfig.DATABASE_HOST,
    dialect: databaseConfig.DATABASE,
    port: databaseConfig.DATABASE_PORT
  }
);

try {
  sequelize
  .authenticate()
  .then(() => {
    console.log("Connected Successfully");

    logger.info("Database connected successfully");
  })
  .catch((err) => {
    console.log("Connection failed -------------------------------------------", err);
    logger.error("Error in connection with database");
  });
} catch (error) {
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++", error);
}


export default sequelize;
