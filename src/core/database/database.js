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
    port: databaseConfig.DATABASE_PORT,
    logging: false
  },
);

sequelize
.authenticate()
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.log("Error in connection with database", err);
});

export default sequelize;
