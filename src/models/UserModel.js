const { DataTypes } = require('sequelize');
const sequelize = require('../db')

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
  refresh_token: {
    type: DataTypes.STRING
  },
  token: {
    type: DataTypes.STRING
  },
  is_admin: {
    type: DataTypes.TINYINT
  }
})

module.exports = User