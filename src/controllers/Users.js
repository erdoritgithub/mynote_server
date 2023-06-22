const User= require('../models/UserModel')

class Users{

    // user registration
    static registerUsers= async (req, res) => {
        try {
            // create user
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })

            // displaying the result of user
            const result = {
                username: user.username,
                email: user.email
            }
    
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).send(error)
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
}

module.exports= Users