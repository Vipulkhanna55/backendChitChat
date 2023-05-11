import { DataTypes } from "sequelize";
import sequelize from "../../database/database";

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
      set(value) {
        this.setDataValue("createdAt", Math.floor(value / 1000));
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default chat;

