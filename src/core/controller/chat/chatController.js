import { saveChat, getUsersChat } from "../../core/chat";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
} from "../../helper";
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
  async getChat(request, response) {
    try {
      const usersChatData = await getUsersChat(
        request.query.senderId,
        request.query.receiverId
      );
      if (!usersChatData) {
        return sendResponse(
          onError(204, messageResponse.CHAT_FETCH_FAILED),
          response
        );
      }

      return sendResponse(
        onSuccess(200, messageResponse.CHAT_FETCH_SUCCESS, usersChatData),
        response
      );
    } catch (error) {
      globalCatch(request, error);
      return sendResponse(onError(500, messageResponse.ERROR), response);
    }
  },
};
export default chatController;
