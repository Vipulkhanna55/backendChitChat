import { likeModel } from "../models";

const insert = async (newLike) => {
  return await likeModel.create(newLike);
};

const findMany = async (query) => {
  return await likeModel.findAll(query);
};

const remove = async (query) => {
  return await likeModel.destroy(query);
};

const removeMany = async (query) => {
  return await likeModel.destroy(query);
};

export default { insert, findMany, remove, removeMany };
