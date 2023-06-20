const axios= require('axios')

class Books{

    static getAllBooks= (req, res) => {
        res.json({ 
            user: 'edo',
            email: 'edo@gmail.com'
        })
    }

}

module.exports= Books