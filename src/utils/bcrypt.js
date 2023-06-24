import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const bcrypthash= (password) => {
    const saltKey= parseInt(process.env.SECRET_SALT_KEY)
    // generate salt
    const salt = bcrypt.genSaltSync(saltKey);
    // update req.body.password to be hash password
    return bcrypt.hashSync(password, salt);
}

export default bcrypthash