import zlib  from 'zlib'
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
      type: DataTypes.TEXT('long'),
      set(value){
        const compress=zlib.deflateSync(value).toString('base64');
        this.setDataValue('attachment', compress);
      },
      get(){
        const attachment = this.getDataValue('attachment');
        const unCompress=zlib.inflateSync(Buffer.from(attachment,'base64')); 
        return unCompress.toString();
      }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default post;
