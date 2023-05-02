import logger from "./logger.js";

const globalCatch = (request, error) => {
  console.log(`Error in catch with route ${request.path} with method ${request.method} and with message ${error.message}`);
  logger.error(
    `Error in catch with route ${request.path} with method ${request.method} and with message ${error.message}`
  );
};
export { globalCatch };
