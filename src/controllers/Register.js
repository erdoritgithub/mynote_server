const validator = require('validator');
const User= require('../models/UserModel')
const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')

dotenv.config()

class Register{

    static createUsers= async (req, res) => {

        const saltKey= parseInt(process.env.SECRET_SALT_KEY)
        const salt = bcrypt.genSaltSync(saltKey);
        let hashedPassword = bcrypt.hashSync(req.body.password, salt);

        if(validator.contains(req.body.username, ' ') === true){
            req.body.username = null
            return res.status(500).json('username is not valid, must be no space')
        }

        if(validator.isEmail(req.body.email) === false){
            req.body.email = null
            return res.status(500).json('email is not valid')
        }

        if(validator.isStrongPassword(req.body.password) === false){
            hashedPassword= null
            return res.status(500).json(`Password at least 8 character with combination of Uppercase, lowercase` +
            ` number and character`)
        }

        if(req.body.password !== req.body.confirmPassword){
            hashedPassword= null
            return res.status(500).json("password and confirm password didn't match")
        }

        try {
            
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
    
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static getAllUsers= async (req, res) => {
        // Find all users
        try {
            const users = await User.findAll();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static getUser= async (req, res) => {
        try {
            const user= await User.findAll({
                where: {
                  id: req.params.id
                }
            });
    
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static updateUser= async (req, res) => {

        if(req.body.username){
            if(validator.contains(req.body.username, ' ') === true){
                req.body = null
                return res.status(500).json('username is not valid, must be no space')
            }
        }

        if(req.body.email){
            if(validator.isEmail(req.body.email) === false){
                req.body = null
                return res.status(500).json('email is not valid')
            }
        }

        try {

            const updatedUser= await User.update( req.body , {
                where: {
                  id: req.params.id
                }
            });
    
            const user= await User.findAll({
                where: {
                  id: req.params.id
                }
            });
    
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static deleteUser= async (req, res) => {
        try {
            // Delete everyone named "Jane"
            const deletedUser= await User.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            const user= await User.findAll();
    
            res.status(200).json(user)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports= Register