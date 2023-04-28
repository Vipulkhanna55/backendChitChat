import { commentModel, postModel, userModel } from "../models";

const post = {
  async findOneUser(userId) {
    return await userModel.findOne({ where: { id: userId } });
  },

  async createPost(postDataObject) {
    return await postModel.create(postDataObject);
  },

  async findOnePost(id) {
    return await postModel.findByPk(id);
  },

  async getAllPost(userId) {
    return await postModel.findAll({ where: { userId } });
  },
  async updatePost(id, body, attachment) {
    return await postModel.update({ body, attachment }, "id", { where: { id } });
  },

  async deletePost(id) {
    return await postModel.destroy({ where: { id: id } });
  },

  async getPostComments(postId) {
    return await commentModel.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: postModel,
          as: "post",
          attributes: ["id", "body", "attachment", "createdAt", "userId"],
        },
      ],
    });
  },

  async isPostExist(id) {
    return await postModel.count({ distinct: "id", where: { id } });
  },

  async getAllPosts(postData) {
    const userPostData = postData.map(async (singlePostData) => {
      const postComments = await this.getPostComments(singlePostData.toJSON().id);
      return postComments.length ? postComments : singlePostData;
    }, this);
    const toSaveData = await Promise.all(userPostData);
    return toSaveData;
  },

  async deletePostComments(id) {
    return await commentModel.destroy({ where: { postId: id } });
  },
};
export default post;
