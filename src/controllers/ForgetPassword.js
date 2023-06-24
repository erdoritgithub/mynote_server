const User= require('../models/UserModel')
const Token= require('../models/TokenModel')
const dotenv= require('dotenv')
const jwt= require('jsonwebtoken')
const sendMail = require('../utils/sendMail')
const bcrypthash= require('../utils/bcrypt')
const { passwordValidator } = require('../middleware/validator')

dotenv.config()

const forgetPassword= async (req, res) => {
    try {
        
        // find user by id
        const user= await User.findAll({
            where: {
              id: req.params.id
            }
        });

        const passwordToken =jwt.sign({ data: req.body.username }, process.env.FORGET_PASSWORD_TOKEN, 
            { expiresIn: '5m' });

        sendMail(passwordToken, user[0].email)
    
        // add token to password_token database
        const token= await Token.create({
            token: passwordToken,
            user_id: user[0].id
        })
    
        res.status(200).json(token)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

const changeForgottenPassword= async (req, res) => {
    try {

        const token= await Token.findAll({
            where: {
              token: req.params.token
            }
        });


        if(passwordValidator(req.body.password) === false){
            return res.status(500).send('password is not valid')
        }


        if(req.body.password !== req.body.confirmPassword){
            return res.status(500).send('password and confirmPassword is not match')
        }

        const user= await User.update({password: bcrypthash(req.body.password)}, {
            where: {
              id: token[0].user_id
            }
        }).then(
            await Token.destroy({
                where: {
                  token: req.params.token
                }
            })
        )

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports= {forgetPassword, changeForgottenPassword}