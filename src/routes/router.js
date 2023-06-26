import express from 'express'
const router= express.Router()
import Users from '../controllers/Users.js'
import Login from '../controllers/Login.js'
import refreshToken from '../controllers/RefreshToken.js'
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js'
import jwtToken from '../middleware/jwtToken.js'
import { forgetPassword, changeForgottenPassword } from '../controllers/ForgetPassword.js'
import Notes from '../controllers/Notes.js'

// Homepage
router.get('/', (req, res) => {
    res.send('This is HomePage')
})

// post
// register
router.post('/users/register', Users.registerUsers)
// login
router.post('/users/login', jwtToken, Login.loginUser)
// notes
router.post('/notes/add', authMiddleware, Notes.addNote)

// get
// getting user/users
router.get('/users', authMiddleware, Users.getAllUsers)
router.get('/users/:id', authMiddleware, Users.getUser)
// refresh token
router.get('/token', refreshToken)
// forget password
router.get('/forgetPassword/:id', forgetPassword)
// get all notes
router.get('/notes/all', authMiddleware, Notes.getAllNotes)
// getting user notes
router.get('/notes/user', authMiddleware, Notes.getAllNotesByUser)
// getting user notes by slug
router.get('/note/:slug', authMiddleware, Notes.getAllNotesByUserAndSlug)

// put
// update user
router.put('/users/:id', authMiddleware, Users.updateUser)
// update forgotten password
router.put('/forgetPassword/:token', changeForgottenPassword)
// update password by id
router.put('/updatePassword/:id', authMiddleware, Users.updatePassword)
// update notes of user
router.put('/notes/user/update/:id', authMiddleware, Notes.updateNoteByUser)

// delete notes of user
router.delete('/notes/user/delete/:id', authMiddleware, Notes.deleteNoteByUser)
// logout
router.delete('/logout', authMiddleware, Login.logoutUser)
// delete user
router.delete('/users/:id', authMiddleware, isAdmin, Users.deleteUser)

// 404 NOT FOUND
router.get('/*', (req, res) => {
    res.status(500).send('404 not Found')
})

export default router