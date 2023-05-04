import { chatController } from "../../controller";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "../logger.js";
import { relationshipController } from "../../controller";

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
        console.log("Error in new connection", error);
      }
    });
    socket.on("addFriend", async (friendInput) => {
      const successRelation = await relationshipController.createRelationship({
        followerUserId: friendInput.followerUserId,
        followedUserId: friendInput.followedUserId,
      });
      socket.emit("followRequest", successRelation);
    });
    socket.on("requestAccepted", async (friendInput) => {
      if (friendInput.status === "Accepted") {
        const requestAccepted = await relationshipController.updateRelation({
          followerUserId: friendInput.followerUserId,
          followedUserId: friendInput.followedUserId,
        });
      } else {
        relationshipController.removeRelationship({
          followerUserId: friendInput.followerUserId,
          followedUserId: friendInput.followedUserId,
        });
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
        console.log("Error while sending chat", error);
      }
    });
    socket.on("disconnect", (message) => {
      console.log("Disconnected");
      delete users[socket.id];
    });
  });
  return server;
};
export default connectSocket;
