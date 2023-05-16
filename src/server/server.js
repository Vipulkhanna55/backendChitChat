import server from "./index.js";
import { logger } from "../core/helper/index.js";
import config from '../../config/config.js';


server.listen(config.PORT, () => {
  logger.info(`listening on port ${config.PORT}`);
});
