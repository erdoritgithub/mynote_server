const express= require('express')
const router= express.Router()
const Products= require('../controllers/Products')

// define the home page route
router.get('/', (req, res) => {
    res.send('This is HomePage')
})
// define the about route
router.get('/products', Products.getProduct)

module.exports= router