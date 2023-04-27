import { chatController } from "../../controller";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "../logger";
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
        socket.to(socketConnected[user.id]).emit("online");
      } catch (error) {
        console.log(logger.chatLogs().connection);
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
        console.log(logger.chatLogs().sendChat);
      }
    });
    socket.on("getChat", async (receiveChat) => {
      try {
        const usersChat = await chatController.getChat(
          receiveChat.senderId,
          receiveChat.receiverId
        );
        console.log(usersChat);
        socket
          .to(socketConnected[receiveChat.senderId])
          .emit("getChat", usersChat);
      } catch (error) {
        console.log(logger.chatLogs().fetchChat);
      }
    });
    socket.on("disconnect", (message) => {
      delete users[socket.id];
    });
  });
  return server;
};
export default connectSocket;
