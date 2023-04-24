import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";

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
      type: DataTypes.STRING,
    },
    attachment: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  
  },

  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default post;
