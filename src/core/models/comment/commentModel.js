import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import user from "../user";
import post from "../post";


const comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.STRING,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

comment.belongsTo(user, { foreignKey: "userId" });
comment.belongsTo(post,{ foreignKey: "postId" });

export default comment;
