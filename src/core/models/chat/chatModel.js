import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
const chat = sequelize.define(
  "chat",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().getHours() + ":" + new Date(). getHours(),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default chat;
