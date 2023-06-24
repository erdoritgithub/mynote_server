import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Note= sequelize.define('note', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      require: true
    },
    excerpt : {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
    },
    description : {
      type: DataTypes.TEXT
    }
})
  
export default Note