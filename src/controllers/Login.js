const User= require('../models/UserModel')
const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')
const jwt= require('jsonwebtoken')

dotenv.config()

class Login{
    static loginUser= async (req, res) => {

        try {

            const accessToken= jwt.sign({ data: req.body.username }, process.env.JWT_SECRET_KEY, 
            { expiresIn: '1m' });

            const refreshToken= jwt.sign({ data: req.body.username }, 
                process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '1d' });

            const updatedUser= await User.update( {refresh_token: refreshToken} , {
                where: {
                    username: req.body.username
                }
            });

            const user= await User.findAll({
                where: {
                  username: req.body.username
                }
            });

            res.cookie('refreshToken', refreshToken, { 
                httpOnly: true, 
                maxAge: 24 * 60 * 60 * 1000 
            })

            const resultPasswordCompare = bcrypt.compareSync(req.body.password, user[0].password)

            const result= [
                {user},
                {"token": accessToken}
            ]
    

            if(resultPasswordCompare){
                res.status(200).json(result)
            }else{
                return res.status(500).send("username or password is wrong")
            }

        } catch (error) {
            res.status(500).send(error)
        }
        
    }

    static logoutUser= async(req, res) => {
        const refreshToken= req.cookies.refreshToken
        console.log(refreshToken)
        if(!refreshToken){
            return res.sendStatus(204)
        }

        const user= await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if(!user) return res.sendStatus(204)

        await User.update({refresh_token: null}, {
            where:{
                id: user[0].id
            }
        })

        res.clearCookie('refreshToken')
        return res.sendStatus(200)
    }
}

module.exports= Login