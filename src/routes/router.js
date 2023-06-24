import express from 'express'
const router= express.Router()
import Users from '../controllers/Users.js'
import Login from '../controllers/Login.js'
import refreshToken from '../controllers/RefreshToken.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'
import jwtToken from '../middleware/jwtToken.js'
import { forgetPassword, changeForgottenPassword } from '../controllers/ForgetPassword.js'

// Homepage
router.get('/', (req, res) => {
    res.send('This is HomePage')
})

// post
// register
router.post('/users/register', Users.registerUsers)
// login
router.post('/users/login', jwtToken, Login.loginUser)

// get
// getting user/users
router.get('/users', authMiddleware, Users.getAllUsers)
router.get('/users/:id', authMiddleware, Users.getUser)
// refresh token
router.get('/token', refreshToken)
// forget password
router.get('/forgetPassword/:id', forgetPassword)

// put
// update user
router.put('/users/:id', authMiddleware, Users.updateUser)
router.put('/forgetPassword/:token', changeForgottenPassword)
router.put('/updatePassword/:id', authMiddleware, Users.updatePassword)

// delete
// logout
router.delete('/logout', authMiddleware, Login.logoutUser)
// delete user
router.delete('/users/:id', authMiddleware, isAdmin, Users.deleteUser)

// 404 NOT FOUND
router.get('/*', (req, res) => {
    res.status(500).send('404 not Found')
})

export default router