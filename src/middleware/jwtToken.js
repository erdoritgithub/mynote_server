const User= require('../models/UserModel')
const dotenv= require('dotenv')
const jwt= require('jsonwebtoken')

dotenv.config()

const jwtToken = async (req, res, next) =>{

    // access token
    const accessToken= jwt.sign({ data: req.body.username }, process.env.JWT_SECRET_KEY, 
        { expiresIn: '5m' });

    // refresh token
    const refreshToken= jwt.sign({ data: req.body.username }, 
        process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '1d' });

    // update token and refresh token to database
    await User.update( {refresh_token: refreshToken, token: accessToken} , {
        where: {
            username: req.body.username
        }
    });

    // send cookie
    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 
    })

    next()
}

module.exports= jwtToken