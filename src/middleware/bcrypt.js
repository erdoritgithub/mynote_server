const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')

dotenv.config()

const bcrypthash= (req, res, next) =>{
    const saltKey= parseInt(process.env.SECRET_SALT_KEY)
    // generate salt
    const salt = bcrypt.genSaltSync(saltKey);
    // update req.body.password to be hash password
    if(req.body.oldPassword){
        req.body.oldPassword = bcrypt.hashSync(req.body.oldPassword, salt);
    }
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.confirmPassword = bcrypt.hashSync(req.body.confirmPassword, salt);

    next()
}

module.exports= bcrypthash