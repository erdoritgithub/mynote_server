import bcrypt from 'bcryptjs'

const passwordCompare = (password1, password2) => {
    // comparing the request password and hash password
    return bcrypt.compareSync(password1, password2)

}

export default passwordCompare