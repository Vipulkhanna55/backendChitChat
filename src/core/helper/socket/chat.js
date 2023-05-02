import { chatController } from "../../controller";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "../logger.js";

const connectSocket = (app) => {
  const server = createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });
  const users = [];
  const socketConnected = [];
  io.on("connection", (socket) => {
    socket.on("newUser", (user) => {
      try {
        users[socket.id] = user.name;
        socketConnected[user.id] = socket.id;
        socket.to(socketConnected[user.id]).emit("online", "online");
      } catch (error) {
        logger.error("Error in new connection", error);
      }
    });
    socket.on("message", async (messageInput) => {
      try {
        const { senderId, receiverId, body } = messageInput;
        const receiveChat = await chatController.saveUsersChat(
          senderId,
          receiverId,
          body
        );
        socket.to(socketConnected[receiverId]).emit("receive", receiveChat);
      } catch (error) {
        logger.error("Error while sending chat", error);
      }
    });
    socket.on("disconnect", (message) => {
      logger.info("Disconnected");
      delete users[socket.id];
    });
  });
  return server;
};
export default connectSocket;
