const express= require('express')
const router= require('./routes')
const cookieParser = require('cookie-parser')
const bodyParser= require('body-parser')

const app = express()
// port
const port = 3000

// middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

// running app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})