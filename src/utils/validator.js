import validator from 'validator';

const usernameValidator = (username) => {
    if(username){
        if(validator.contains(username, ' ') === true){
            username = null
            return false
        }
    }
}

const emailValidator = (email) => {
    if(email){
        if(validator.isEmail(email) === false){
            email = null
            return false
        }
    }
}

const passwordValidator = (password) => {
    if(validator.isStrongPassword(password) === false){
        password= null
        return false
    }
}

export {usernameValidator, emailValidator, passwordValidator}