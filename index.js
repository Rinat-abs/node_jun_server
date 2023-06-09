require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const fileUpload = require('express-fileupload')


const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api',router)


//Обработка ошибок
app.use(errorHandler)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log('Сервер запущен на порту: ' + PORT))
    } catch(e)
    {
        console.log(e)
    }
}

start()


