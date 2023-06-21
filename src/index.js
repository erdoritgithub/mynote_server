const express= require('express')
const router= require('./routes')
const cookieParser = require('cookie-parser')
const bodyParser= require('body-parser')

const app = express()
const port = 3000

app.use(cookieParser())
app.use(bodyParser.json())
// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})