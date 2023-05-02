import { relationshipModel } from "../models";

const insert = async (body) => {
  return await relationshipModel.create(body);
};

const getOne = async (query) => {
  return await relationshipModel.findOne(query);
};

const getMany = async (query) => {
  return await relationshipModel.findAll(query);
};

const remove = async (query) => {
  return await relationshipModel.destroy(query);
};

export default {
  insert,
  getOne,
  getMany,
  remove,
};
