import { Sequelize } from "sequelize";
import logger from '../helper/logger.js'
const sequelize = new Sequelize("fortest", "sammy", "password", {
  host: "localhost",
  dialect: "mysql",
});
sequelize.authenticate().then(()=>{console.log(logger.dataBaseLogs().success)}).catch(()=>{console.log(logger.dataBaseLogs().reject)});


export default sequelize;