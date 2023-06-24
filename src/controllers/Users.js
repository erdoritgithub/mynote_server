const User= require('../models/UserModel')
const passwordCompare= require('../utils/passwordCompare')
const bcrypthash= require('../utils/bcrypt')
const { usernameValidator, emailValidator, passwordValidator } = require('../middleware/validator')

class Users{

    // user registration
    static registerUsers= async (req, res) => {
        try {

            if(req.body.password !== req.body.confirmPassword){
                return res.status(500).send('password and confirmPassword is not match')
            }
            
            if(usernameValidator(req.body.username) === false){
                return res.status(500).send('username must be no space')
            }

            if(emailValidator(req.body.email) === false){
                return res.status(500).send('email is not valid')
            }

            if(passwordValidator(req.body.password) === false){
                return res.status(500).send('password is not valid')
            }

            
            // // create user
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypthash(req.body.password)
            })

            // displaying the result of user
            const result = {
                username: user.username,
                email: user.email
            }
    
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).send('error from here')
        }
    }

    // Find all users
    static getAllUsers= async (req, res) => {
        try {
            // find all users
            const users = await User.findAll();

            // displaying all users
            const result = users.map((user) => (
                {
                    username: user.username,
                    email: user.email
                }
            ))

            res.status(200).json(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // Find user by id
    static getUser= async (req, res) => {
        try {
            // find user by id
            const user= await User.findAll({
                where: {
                  id: req.params.id
                }
            });

            // displaying the result of user
            const result = {
                username: user[0].username,
                email: user[0].email
            }
    
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // Update data user
    static updateUser= async (req, res) => {
       
        try {

            if(usernameValidator(req.body.username) === false){
                return res.status(500).send('username must be no space')
            }

            if(emailValidator(req.body.email) === false){
                return res.status(500).send('email is not valid')
            }

            // update user by id
            await User.update( req.body , {
                where: {
                  id: req.params.id
                }
            });
    
            // find user by id
            const user= await User.findAll({
                where: {
                  id: req.params.id
                }
            });

             // displaying the result of user
            const result = {
                username: user[0].username,
                email: user[0].email
            }
    
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    // Delete user by id
    static deleteUser= async (req, res) => {
        try {
            // delete user by id
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            // find all users
            const users= await User.findAll();

            // displaying the result of users
            const result = users.map((user) => (
                {
                    username: user.username,
                    email: user.email
                }
            ))
    
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).send(error)
        }
    }

    static updatePassword= async (req, res) => {
        try {
            const user= await User.findAll({
                where: {
                    id: req.params.id
                }
            })
            
            const resultPasswordCompare = passwordCompare(req.body.oldPassword, user[0].password)
    
            if(!resultPasswordCompare){
                return res.status(500).send('old password is wrong')
            }

            if(passwordValidator(req.body.password) === false){
                return res.status(500).send('password is not valid')
            }

            if(req.body.password !== req.body.confirmPassword){
                return res.status(500).send('password and confirmPassword is not match')
            }
    
            const updatedUser= await User.update({password: bcrypthash(req.body.password)}, {
                where: {
                  id: req.params.id
                }
            });
    
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).send(error)
        }
    }

}

module.exports= Users