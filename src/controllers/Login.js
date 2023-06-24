import User from '../models/UserModel.js'
import passwordCompare from '../utils/passwordCompare.js'

class Login{

    // User login
    static loginUser= async (req, res) => {

        try {
            const token = req.cookies.accessToken
            // find user by username
            const user= await User.findAll({
                where: {
                  username: req.body.username
                }
            });

            // displaying the result of user
            const result = {
                username: user[0].username,
                email: user[0].email,
                token: token
            }

            // comparing the request password and hash password
            const resultPasswordCompare = passwordCompare(req.body.password, user[0].password)

            // check the result of compare
            if(resultPasswordCompare){
                return res.status(200).json(result)
            }else{
                return res.status(500).send("username or password is wrong")
            }

        } catch (error) {
            res.status(500).send(error)
        }
        
    }

    // userLogout
    static logoutUser= async(req, res) => {
        try {    
            // get cookie
            const refreshToken= req.cookies.refreshToken
    
            // check if cookie is not exist
            if(!refreshToken){
                return res.sendStatus(204)
            }
    
            // find user by refresh_token
            const user= await User.findAll({
                where: {
                    refresh_token: refreshToken
                }
            })
    
            // check if user is not exist
            if(!user) {
                // delete cookie if user is not exist
                res.clearCookie('refreshToken')
                res.clearCookie('accessToken')
                return res.sendStatus(204)
            }
    
            // update the refresh_token
            await User.update({refresh_token: null}, {
                where:{
                    id: user[0].id
                }
            })
    
            // delete cookie
            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')
            return res.sendStatus(200)
        } catch (error) {
            res.send(error)
        }
    }
}

export default Login