import { Sequelize } from "sequelize";
import logger from "../helper/logger.js";
import dataMessage from '../../../config/config.js'
const sequelize = new Sequelize(dataMessage.DATABASE_NAME,dataMessage.DATA_USER_NAME,dataMessage.DATABASE_PASSWORD, {
  host: dataMessage.DATABASE_HOST,
  dialect: dataMessage.DATABASE,
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
