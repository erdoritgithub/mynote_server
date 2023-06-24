import User from '../models/UserModel.js'
import Token from '../models/TokenModel.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import sendMail from '../utils/sendMail.js'
import bcrypthash from '../utils/bcrypt.js'
import { passwordValidator } from '../utils/validator.js'

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


export {forgetPassword, changeForgottenPassword}