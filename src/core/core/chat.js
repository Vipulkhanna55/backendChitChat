import { chatModel } from "../models";
import { Op } from "sequelize";

const saveChat = async (inputChat) => {
  return await chatModel.create(inputChat);
};
const getUsersChat = async (senderId, receiverId) => {
  return await chatModel.findAll({
    [Op.or]: [
      { where: { [Op.and]: [{ senderId, receiverId }] } },
      { where: { [Op.and]: [{ senderId:receiverId,receiverId:senderId }] } },
    ],
    order: [["createdAt", "ASC"]],
    raw: true,
  });
};
export { saveChat, getUsersChat };
