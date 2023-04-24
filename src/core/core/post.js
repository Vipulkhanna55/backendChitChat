import { QueryTypes } from "sequelize";
import sequelize from "../database/database";
import { postModel, userModel } from "../models";

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
  async updatePost(id,body,attachment){
    return await postModel.update({body,attachment},{where:{id:id}});

  },
  async deletePost(id){
    return await postModel.destroy({where:{id:id}});
  },
  async getComment(id){
    // return await postModel.findAll({
    //   include:[{
    //     model:userModel,
    //     required:true,
    //   }]
    // })
      return await sequelize.query(`SELECT * from comment where postId=$1  `,['d3cfc52c-eb7a-44e8-bb18-0146b4c5d0bb'], { type: QueryTypes.SELECT });
      

  }
};
export default post;
