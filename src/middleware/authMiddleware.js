import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    try {
        // get authorization header
        const authHeader = req.headers.authorization;
        // split authheader and get the token
        const token = authHeader.split(' ')[1];

        // response error if token and cookie not exist
        if(token == null || req.cookies.refreshToken == undefined) return res.sendStatus(401)

        // verify token 
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(403);

            // change request username to be decoded username
            req.username = decoded.username;
            next();
        });
        
    } catch (error) {
        res.status(500).send('Youre not login')
    }
}

const isAdmin = async (req, res, next) => {
    try {
        // get the cookies
        const refreshToken=  req.cookies.refreshToken

        // get refreshtoken of user
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        // check if user is admin or not
        if(user[0].is_admin === 1){
            next()
        }else{
            return res.status(500).send("You're not an admin")
        }

    } catch (error) {
        res.status(500).send('admin error')
    }
}


export { authMiddleware, isAdmin }