const express= require('express')
const router= express.Router()
const Users= require('../controllers/Users')
const Login= require('../controllers/Login')
const refreshToken= require('../controllers/RefreshToken')
const {authMiddleware, isAdmin}= require('../middleware/authMiddleware')
const { emailValidator, usernameValidator, passwordValidator } = require('../middleware/validator')
const bcrypthash = require('../middleware/bcrypt')
const jwtToken = require('../middleware/jwtToken')

// Homepage
router.get('/', (req, res) => {
    res.send('This is HomePage')
})

// post
// register
router.post('/users/register', usernameValidator, emailValidator, passwordValidator, bcrypthash,
Users.registerUsers)
// login
router.post('/users/login', jwtToken, Login.loginUser)

// get
// getting user/users
router.get('/users', authMiddleware, Users.getAllUsers)
router.get('/users/:id', authMiddleware, Users.getUser)
// refresh token
router.get('/token', refreshToken)

// put
// update user
router.put('/users/:id', authMiddleware, usernameValidator, emailValidator, Users.updateUser)

// delete
// logout
router.delete('/logout', authMiddleware, Login.logoutUser)
// delete user
router.delete('/users/:id', authMiddleware, isAdmin, Users.deleteUser)

// 404 NOT FOUND
router.get('/*', (req, res) => {
    res.status(500).send('404 not Found')
})

module.exports= router