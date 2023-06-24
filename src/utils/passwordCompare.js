const bcrypt= require('bcryptjs')

const passwordCompare = (password1, password2) => {
    // comparing the request password and hash password
    return bcrypt.compareSync(password1, password2)

}

module.exports= passwordCompare