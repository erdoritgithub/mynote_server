const jwt= require('jsonwebtoken')
const dotenv= require('dotenv')

dotenv.config()

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
       
        const token = authHeader && authHeader.split(' ')[1];

        if(token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(403);

            req.username = decoded.username;
            next();
        });
      
        
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports= isAuth