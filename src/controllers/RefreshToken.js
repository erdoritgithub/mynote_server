import User from '../models/UserModel.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const refreshToken = async (req, res) => {
    try {
        // get cookie
        const refreshToken= req.cookies.refreshToken
        
        // check if cookie is not exist
        if(!refreshToken){
            return res.sendStatus(401)
        }

        // find user by refresh_token
        const user= await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        // check if user is not exist
        if(!user[0]) return res.sendStatus(403)

        // verrifying refreshToken
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, decoded) => {
            if(err) return res.sendStatus(403)
            const id= user[0].id
            const username= user[0].username
            const email= user[0].email
            // sign accesToken
            const accessToken= jwt.sign({id, username, email}, process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' })

            res.json({accessToken})
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

export default refreshToken