import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "server_info.log",
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    }),
    new transports.File({
      filename: "server_error.log",
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
});

export default logger;
