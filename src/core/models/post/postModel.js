import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import user from "../user/userModel.js";

const post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT("long"),
    },
    attachment: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

post.belongsTo(user, { foreignKey: "userId" });

export default post;
