const { DataTypes } = require('sequelize');
const sequelize = require('../db')
// const User= require('./UserModel')

const Token= sequelize.define('reset_password_token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
});

// Token.belongsTo(User);

module.exports= Token