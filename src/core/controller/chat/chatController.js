import { saveChat, getUsersChat } from "../../core/chat";
import {
  onSuccess,
  onError,
  sendResponse,
  globalCatch,
  messageResponse,
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
        createdAt:new Date().getTime()
      });
      return savedChat.toJSON();
    } catch (error) {
      console.log(error);
    }
  },

  async getChat(request, response) {
    try {
      const usersChatData = await getUsersChat(
        request.query.senderId,
        request.query.receiverId
      );
      // usersChatData.forEach((element)=>{
      //   const unix_timestamp = Number(element.createdAt);
      //   const date = new Date(unix_timestamp * 1000);
      //   const hours = date.getHours();
      //   const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      //   const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      //   const formattedTime = hours + ":" + minutes.toString().substring(-2) + ":" + seconds.toString().substring(-2);
      //   element.createdAt = formattedTime;
      // })
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
      return sendResponse(onError(500, messageResponse.ERROR_FETCHING_DATA), response);
    }
  },
};

export default chatController;
