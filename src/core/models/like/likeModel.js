import { DataTypes } from 'sequelize';
import sequelize from '../../database/database.js';
import user from '../user';


const like = sequelize.define('like', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false
  }
},
{
    freezeTableName: true
});

like.belongsTo(user, {foreignKey: 'userId'});

export default like;

