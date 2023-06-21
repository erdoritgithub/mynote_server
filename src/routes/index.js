const express= require('express')
const router= express.Router()
const Books= require('../controllers/Books')
const Register= require('../controllers/Register')

// define the home page route
router.get('/', (req, res) => {
    res.send('This is HomePage')
})
// define the about route

// users
router.post('/users', Register.createUsers)

router.get('/users', Register.getAllUsers)
router.get('/users/:id', Register.getUser)
router.get('/books', Books.getAllBooks)

router.put('/users/:id', Register.updateUser)

router.delete('/users/:id', Register.deleteUser)

router.get('/*', (req, res) => {
    res.status(500).send('404 not Found')
})

module.exports= router