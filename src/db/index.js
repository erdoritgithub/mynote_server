import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

let sequelize;

try {
     sequelize = new Sequelize(process.env.DB_URL)
    
} catch (error) {
    throw new Error(error)
}

export default sequelize