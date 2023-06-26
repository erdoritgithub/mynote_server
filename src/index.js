import express from 'express'
import cookieParser  from 'cookie-parser'
import bodyParser from 'body-parser'
import router from './routes/router.js'
import cors from 'cors'

const app = express()
// port
const port = parseInt(process.env.PORT_URL)

// middleware
app.use(cors({
  origin: "http://localhost:3000", // NEW
  credentials: true, // NEW
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

// running app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})