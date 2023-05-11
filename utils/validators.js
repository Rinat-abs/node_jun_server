const {body} = require('express-validator');
const brypt = require('bcrypt')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
exports.registerValidators = [
    body('email').isEmail().withMessage('Введите корректный email').custom(async (value, {req, res}) => {
        try
        {
            console.log(value)
            const candidate = await User.findOne({where: {email: value}})
            // console.log(candidate)
            if(candidate) 
            {
                return Promise.reject('Данный email занят');
            }

        } catch(e)
        {
           return (ApiError.badRequest(e.message))
        }
    }),
    body('name').trim().isLength({min: 2}).withMessage('Минимальная длина имени 2 символа').trim().isLength({ max: 15}).withMessage('Максимальная длина имени 15 символов').isAlpha('ru-RU').withMessage('Имя должно быть введено кириллицей'),

    body('surname').trim().isLength({min: 2}).withMessage('Минимальная длина фамилии 2 символа').trim().isLength({ max: 15}).withMessage('Максимальная длина фамилии 25 символов').isAlpha('ru-RU').withMessage('Фамилия должна быть введена кириллицей'),
    body('password').trim().isLength({min: 3}).withMessage('Минимальная длина пароля 3 символа').trim().isLength({ max: 25}).withMessage('Максимальная длина пароля 25 символов')

]

exports.loginValidation = [
    body('email').isEmail().withMessage('Введите корректный email')
] 

exports.articleValidation = [
    body('text').trim().isLength({min: 10}).withMessage('Минимальная длина записи 10 символов').trim().isLength({ max: 200}).withMessage('Максимальная длина записи 200 символов')
] 