import { saveChat, getUsersChat } from "../../core/chat";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
  memcache,
} from "../../helper";
import { logger } from "../../helper";

const chatController = {
  async saveUsersChat(senderId, receiverId, body) {
    try {
      const today = new Date();
      const savedChat = await saveChat({
        senderId,
        receiverId,
        body,
        createdAt:
          today.getFullYear() +
          ":" +
          (today.getMonth() + 1) +
          ":" +
          today.getDate() +
          ":" +
          today.getHours() +
          ":" +
          today.getMinutes(),
      });
      return savedChat.toJSON();
    } catch (error) {
      console.log(error);
    }
  },

  async getChat(request, response) {
    try {
      const cachedData = memcache.verifyCache("chat");
      if (cachedData) {
        return sendResponse(
          onSuccess(200, messageResponse.CHAT_FETCH_SUCCESS, cachedData),
          response
        );
      }
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
      await memcache.setCacheData("chat", usersChatData);
      return sendResponse(
        onSuccess(200, messageResponse.CHAT_FETCH_SUCCESS, usersChatData),
        response
      );
    } catch (error) {
      globalCatch(request, error);
      return sendResponse(
        onError(500, messageResponse.ERROR_FETCHING_DATA),
        response
      );
    }
  },
};

export default chatController;
