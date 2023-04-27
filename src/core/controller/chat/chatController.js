import { saveChat, getUsersChat } from "../../core/chat";
import logger from "../../helper/logger";

const chatController = {
  async saveUsersChat(senderId, receiverId, body) {
    try {
      const savedChat = await saveChat({ senderId, receiverId, body });
      return savedChat.toJSON();
    } catch (error) {
      console.log(logger.chatLogs().failure);
    }
  },
  async getChat(senderId, receiverId) {
    try {
      const usersChatData = await getUsersChat(senderId, receiverId);
      return usersChatData;
    } catch (error) {
      console.log(logger.chatLogs().fetchChat);
    }
  },
};
export default chatController;
