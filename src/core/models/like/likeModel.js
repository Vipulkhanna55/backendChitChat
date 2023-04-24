import { DataTypes } from 'sequelize';
import sequelize from '../../database/database.js';
import user from '../user';
import post from '../post';


const like = sequelize.define('like', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  }
},
{
    freezeTableName: true
});

like.belongsTo(user, {foreignKey: 'userId'});
like.belongsTo(post, {foreignKey: 'postId'});

export default like;

