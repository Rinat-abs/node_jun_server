const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING}

})
 

const Article = sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING, allowNull: true},

}) 

User.hasMany(Article)
Article.belongsTo(User)
 

module.exports = {
    User, Article
} 