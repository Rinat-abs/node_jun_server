const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
module.exports = function (req, res, next) 
{  
   
   if(req.cookies.accessToken)
   {      
      const token = req.cookies.accessToken
      jwt.verify(token, process.env.SESSION_SECRET, (err, data) => {
         if(err) console.log(err.name)
         else if(data.id) throw ApiError.badRequest('Вы уже авторизованы')
      })
   }


   next()   
}

