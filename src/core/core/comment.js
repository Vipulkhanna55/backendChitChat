import {commentModel} from "../models";

const insert = async (newComment) => {
  return await commentModel.create(newComment);
};

const modify = async (body, id) => {
  return await commentModel.update({ body: body }, { where: { id: id } });
};

const findOne = async (query) => {
  return await commentModel.findOne(query);
};

const findMany = async (query) => {
  return await commentModel.findAll(query);
};

const remove = async (query) => {
  return await commentModel.destroy(query);
};

const removeMany = async (query) => {
  return await commentModel.destroy(query);
};

export default { insert, modify, findOne, findMany, remove, removeMany };
