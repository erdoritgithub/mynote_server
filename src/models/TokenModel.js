import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

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

export default Token