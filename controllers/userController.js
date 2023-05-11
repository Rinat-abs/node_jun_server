const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenService = require('../utils/token')
const ApiError = require('../error/ApiError')
const {User} = require('../models/models')


 
class UserController {

    //POST /api/user/reg
    async reg(req, res, next) {
        try {   

            const {email, password, surname, name} = req.body
            const errors = validationResult(req)

            if (!errors.isEmpty())  throw ApiError.badRequest({error: errors.array()[0].msg, data: {email, password, surname, name}})

            const hashPassword = await bcrypt.hash(password, 5)
            await User.create({email, name, surname, password: hashPassword})
            return res.status(200).json('Аккаунт успешно создан, авторизуйтесь') 

        } catch(err)
        {
            next(err.message)
        }

    }


    //POST /api/user/login
    async login(req, res, next) {

        try 
        {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw (ApiError.BadRequest(errors.array()[0].msg)) 

            const user = await User.findOne({where: {email: req.body.email}})
            if(!user) throw (ApiError.badRequest('Пользователь не найден'))
            
            let comparePassword = bcrypt.compareSync(req.body.password, user.password)

            if(!comparePassword) throw(ApiError.badRequest('Указан неверный пароль'))

            const token = tokenService.generateToken(user.id)
            const {password, createdAt, updatedAt, ...userData} = user.dataValues
            res.cookie("accessToken", token, {
                httpOnly: true
            }).status(200).json({userData, token})


        } catch(err)
        {
            next(err)
        }
        
    }


        // GET /logout
        logout = async(req, res) => {
            res.clearCookie('accessToken', {
                secure: true,
                sameSite: "none"
            }).status(200).json("Выход выполнен")
        }


}

module.exports = new UserController()