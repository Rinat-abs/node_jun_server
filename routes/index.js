const Router = require('express')
const router = new Router()

const userRouter = require('./user')
const articleRouter = require('./article')

router.use('/user', userRouter)
router.use('/articles', articleRouter)


module.exports = router