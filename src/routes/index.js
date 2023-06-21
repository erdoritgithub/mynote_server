const express= require('express')
const router= express.Router()
const Books= require('../controllers/Books')
const Users= require('../controllers/Users')
const Login= require('../controllers/Login')
const refreshToken= require('../controllers/RefreshToken')
const isAuth= require('../middleware/auth')

// define the home page route
router.get('/', (req, res) => {
    res.send('This is HomePage')
})
// define the about route

// users
router.post('/users/register', Users.registerUsers)
router.post('/users/login', Login.loginUser)

router.get('/users', isAuth, Users.getAllUsers)
router.get('/users/:id', Users.getUser)
router.get('/books', Books.getAllBooks)
router.get('/token', refreshToken)
router.delete('/logout', Login.logoutUser)

router.put('/users/:id', Users.updateUser)

router.delete('/users/:id', Users.deleteUser)

router.get('/*', (req, res) => {
    res.status(500).send('404 not Found')
})

module.exports= router