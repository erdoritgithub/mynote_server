import RefreshToken from '../models/RefreshTokenModel.js'
import User from '../models/UserModel.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const jwtToken = async (req, res, next) =>{

    // access token
    const accessToken= jwt.sign({ data: req.body.username }, process.env.JWT_SECRET_KEY, 
        { expiresIn: '1h' });

    // refresh token
    const refreshToken= jwt.sign({ data: req.body.username }, 
        process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '1h' });
    
    const user= await User.findAll({
        where: {
            username: req.body.username
        }
    });

    // update token and refresh token to database
    await RefreshToken.create({
        token: refreshToken,
        user_id: user[0].id
    })
   

    // send cookie
    res.cookie('accessToken', accessToken, { 
        httpOnly: false, 
        maxAge: 1 * 60 * 60 * 1000 
    })
    res.cookie('refreshToken', refreshToken, { 
        httpOnly: false, 
        maxAge: 1 * 60 * 60 * 1000 
    })

    next()
}

export default jwtToken