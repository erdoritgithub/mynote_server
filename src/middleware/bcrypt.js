const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')

dotenv.config()

const bcrypthash= (req, res, next) =>{
    const saltKey= parseInt(process.env.SECRET_SALT_KEY)
    // generate salt
    const salt = bcrypt.genSaltSync(saltKey);
    // update req.body.password to be hash password
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    next()
}

module.exports= bcrypthash