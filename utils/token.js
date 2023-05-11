const jwt = require('jsonwebtoken')
const {User} = require('../models/models')


class TokenService {
    generateToken(userId) 
    {
        const token = jwt.sign({id: userId}, process.env.SESSION_SECRET, {expiresIn: '2h'})
        return token
    }

    validateToken(token)
    {
        try 
        {   
            const userData = jwt.verify(token, process.env.SESSION_SECRET)
            
            return userData
        }catch(err)
        {
            console.log(err)
            return null
        }
    }

    async validateTokenAndGetUser(token)
    {
        const tokenData =  this.validateToken(token)
        const {password, ...userData} = (await User.findByPk(tokenData.id)).dataValues
        
        return userData
    }
}

module.exports = new TokenService() 