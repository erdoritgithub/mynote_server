const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')

dotenv.config()

const bcrypthash= (password) => {
    const saltKey= parseInt(process.env.SECRET_SALT_KEY)
    // generate salt
    const salt = bcrypt.genSaltSync(saltKey);
    // update req.body.password to be hash password
    return bcrypt.hashSync(password, salt);
}

module.exports= bcrypthash