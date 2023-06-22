const { Sequelize } = require('sequelize');
const dotenv= require('dotenv')
dotenv.config()

let sequelize;

try {
     sequelize = new Sequelize(process.env.DB_URL)
    
} catch (error) {
    throw new Error(error)
}

module.exports= sequelize