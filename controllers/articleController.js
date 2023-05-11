const uuid = require('uuid')
const path = require('path')

const {Article} = require('../models/models')
const ApiError = require('../error/ApiError')
const tokenService = require('../utils/token')


class ArticleController {


    async getAll(req, res) {

        const {num} = req.params
        const  notes = await Article.findAndCountAll({limit: num*20, offset: num*20 - 20})

        return res.status(200).json(notes)
    }

    async getById(req, res) {
        const userData = await tokenService.validateTokenAndGetUser(req.cookies.accessToken)
        
    }



    // POST /api/articles/create

    async create(req, res, next) {
        try {
            const userData = await tokenService.validateTokenAndGetUser(req.cookies.accessToken)

            const {text} = req.body
           
            console.log(userData)

            if(req.files)  
            {
                if(req.files.img)
                {
                    let fileName = uuid.v4() + ".jpg"
                    req.files.img.mv(path.resolve(__dirname, '..', 'static', fileName))
                    const article = await Article.create({text, userId: userData.id, img: fileName})
                    return res.json(article)
                }
            }
        
            const article = await Article.create({text, userId: userData.id})
            return res.json(article)

        } catch(e)
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res) {

    }
}

module.exports = new ArticleController()