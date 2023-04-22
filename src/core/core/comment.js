import { commentModel, userModel } from "../models";

const create = async (newComment) => {
  return await commentModel.create(newComment);
};

const update = async (body, id) => {
  return await commentModel.update(body, { where: { id: id } });
};

const findOne = async (id) => {
  return await commentModel.findByPk(id);
};

const findMany = async (postId) => {
  return await commentModel.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: userModel,
        attributes: ["id", "firstName", "lastName", "profilePic"],
      },
    ],
  });
};

const remove = async (id) => {
  return await commentModel.destroy({ where: { id: id } });
};

const removeMany = async (postId) => {
  return await commentModel.destroy({ where: { postId: postId } });
};

export default { create, update, findOne, findMany, remove, removeMany };
