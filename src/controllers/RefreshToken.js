const User= require('../models/UserModel')
const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')
const jwt= require('jsonwebtoken')

dotenv.config()

const refreshToken = async (req, res) => {
    try {
        const refreshToken= req.cookies.refreshToken
        
        if(!refreshToken){
            return res.sendStatus(401)
        }

        const user= await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if(!user[0]) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, decoded) => {
            if(err) return res.sendStatus(403)
            const id= user[0].id
            const username= user[0].username
            const email= user[0].email
            const accessToken= jwt.sign({id, username, email}, process.env.JWT_SECRET_KEY,
            { expiresIn: '1m' })

            res.json({accessToken})
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports= refreshToken