
const Sequilize = require('sequelize')
const db = new Sequilize('postgres://aidanfarhi:secret123@localhost:5432/wikistack', {logging: false})

const Page = db.define('page', {
    title: {type: Sequilize.STRING, allowNull: false},
    slug: {type: Sequilize.STRING, allowNull: false},
    content: {type: Sequilize.STRING, allowNull: false},
    status: {type: Sequilize.ENUM('open', 'closed')},
},
{
    hooks: {
        beforeValidate: (page) => {
            page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '')
        } 
    }
})

const User = db.define('user', {
    name: {type: Sequilize.STRING, allowNull: false},
    email: {type: Sequilize.STRING, allowNull: false, validate: { isEmail: true }}
})

Page.belongsTo(User, { as: 'author' })

module.exports = { db, Page, User }
