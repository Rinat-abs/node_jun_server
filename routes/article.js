const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController')
const authMiddleware = require('../middleware/auth')
const articleValidation = require('../utils/validators')

router.get('/pagination/:num', articleController.getAll)
router.get('/:id', articleController.getById)
router.post('/create', authMiddleware, articleValidation, articleController.create)
router.post('/edit',authMiddleware,articleValidation, articleController.edit)


module.exports = router