var validator = require('validator');
const User= require('../models/UserModel')

class Users{
    static createUsers= async (req, res) => {
        try {
            if(validator.isEmail(req.body.email) === false){
                req.body.email = null
            }
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
    
            res.json(user)
            
        } catch (error) {
            res.send(error)
        }
    }

    static getAllUsers= async (req, res) => {
        // Find all users
        try {
            const users = await User.findAll();
            res.json(users)
        } catch (error) {
            res.send(error)
        }
    }

    static getUser= async (req, res) => {
        try {
            const user= await User.findAll({
                where: {
                  id: req.params.id
                }
            });
    
            res.json(user)
            
        } catch (error) {
            res.send(error)
        }
    }

    static updateUser= async (req, res) => {

        try {
            
            if(validator.isEmail(req.body.email) === false){
                req.body.email = null
            }

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
    
            res.json(user)
            
        } catch (error) {
            res.send(error)
        }
    }

    static deleteUser= async (req, res) => {
        // Delete everyone named "Jane"
        const deletedUser= await User.destroy({
            where: {
                id: req.params.id
            }
        });

        const user= await User.findAll();

        res.json(user)
    }
}

module.exports= Users