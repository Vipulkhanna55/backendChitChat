import { chatController } from "../../controller";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "../logger.js";
import { relationshipController } from "../../controller";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";

const connectSocket = (app) => {
  const server = createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });
  const sockets = {};
  const socketConnected = {};
  const userIdArray = [];
  io.on("connection", (socket) => {
    const authToken = socket.handshake.auth["token"];
    if (!socket.connected) return;
    jwt.verify(authToken, config.SECRET, (error, data) => {
      if (error) {
        console.log("token verification failed");
        return;
      }
      const userId = data.id;
      try {
        userIdArray[socket.id] = userId;
        sockets[socket.id] = socket;
        if (!socketConnected[userId]) {
          socketConnected[userId] = [];
        }
        socketConnected[userId].push(socket.id);
        socket.to(socketConnected[userId]).emit("online", "online");
      } catch (error) {
        console.log("Error in new connection", error);
      }
      
      socket.on("addFriend", async (friendInput) => {
        const successRelation = await relationshipController.createRelationship(
          {
            followerUserId: friendInput.followerUserId,
            followedUserId: friendInput.followedUserId,
          }
        );
        if (socketConnected[friendInput.followedUserId] != undefined) {
          socket
            .to(socketConnected[friendInput.followedUserId])
            .emit("followRequest", successRelation);
        }
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
        if (socketConnected[userIdArray[socket.id]]) {
          const index = socketConnected[userIdArray[socket.id]].indexOf(
            socket.id
          );
          socketConnected[userIdArray[socket.id]].splice(index, 1);
          if (!socketConnected[userIdArray[socket.id]].length) {
            delete socketConnected[userIdArray[socket.id]];
          }
        }
      });

    });
  });
  return server;
};
export default connectSocket;
