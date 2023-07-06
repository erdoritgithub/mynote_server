import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Token from './TokenModel.js';
import Note from './NoteModel.js';
import RefreshToken from './RefreshTokenModel.js';


const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    require: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    require: true
  },
  password : {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  is_admin: {
    type: DataTypes.TINYINT
  }
})

User.hasOne(Token, {
  foreignKey: {
    name: 'user_id',
    type: DataTypes.UUID
  }
});

User.hasMany(Note, {
  foreignKey: {
    name: 'user_id',
    type: DataTypes.UUID
  }
})

User.hasMany(RefreshToken, {
  foreignKey: {
    name: 'user_id',
    type: DataTypes.UUID
  }
})

export default User