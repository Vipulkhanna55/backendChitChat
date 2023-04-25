import { DataTypes } from "sequelize";
import sequelize from "../../database/database.js";
import user from "../user";

const relationship = sequelize.define(
  "relationship",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    isRequestAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  },
  {
    freezeTableName: true,
  }
);

relationship.belongsTo(user, { foreignKey: "followerId" });
relationship.belongsTo(user, { foreignKey: "followedUserId" });

export default relationship;
