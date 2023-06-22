const validator = require('validator');

const usernameValidator = (req, res, next) => {
    if(req.body.username){
        if(validator.contains(req.body.username, ' ') === true){
            req.body.username = null
            return res.status(500).json('username is not valid, must be no space')
        }
    }
    next()
}

const emailValidator = (req, res, next) => {
    if(req.body.email){
        if(validator.isEmail(req.body.email) === false){
            req.body.email = null
            return res.status(500).json('email is not valid')
        }
    }
    next()
}

const passwordValidator = (req, res, next) => {
    if(validator.isStrongPassword(req.body.password) === false){
        hashedPassword= null
        return res.status(500).json(`Password at least 8 character with combination of Uppercase, lowercase` +
        ` number and character`)
    }
    
    if(req.body.password !== req.body.confirmPassword){
        hashedPassword= null
        return res.status(500).json("password and confirm password didn't match")
    }

    next()
}

module.exports= {usernameValidator, emailValidator, passwordValidator}