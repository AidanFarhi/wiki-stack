
const Sequilize = require('sequelize')
const db = new Sequilize('postgres://aidanfarhi:secret123@localhost:5432/wikistack', {logging: false})

const Page = db.define('page', {
    title: {type: Sequilize.STRING, allowNull: false},
    slug: {type: Sequilize.STRING, allowNull: false},
    content: {type: Sequilize.STRING, allowNull: false},
    status: {type: Sequilize.ENUM('open', 'closed')},
    tags: {type: Sequilize.ARRAY(Sequilize.TEXT)}
    }
)

Page.beforeValidate((page) => {
    if (!page.slug) {
        page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '')
        page.tags = page.tags.replace(/\s+/g,'').split('#').slice(1)
    }
})

Page.findByTag = (tag => {
    return Page.findAll({
        where: {
            tags: {
                [Sequilize.Op.overlap]: tag.split(' ')
            }
        }
    })
})

const User = db.define('user', {
    name: {type: Sequilize.STRING, allowNull: false},
    email: {type: Sequilize.STRING, allowNull: false, validate: { isEmail: true }}
})

Page.belongsTo(User, { as: 'author' })

User.hasMany(Page, {foreignKey: 'authorId'})

module.exports = { db, Page, User }
