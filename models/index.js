
const Sequilize = require('sequelize')
const db = new Sequilize('postgres://aidanfarhi:secret123@localhost:5432/wikistack', {logging: false})

const Page = db.define('page', {
    title: {type: Sequilize.STRING},
    slug: {type: Sequilize.STRING},
    content: {type: Sequilize.STRING},
    status: {type: Sequilize.ENUM('open', 'closed')}
})

const User = db.define('user', {
    name: {type: Sequilize.STRING},
    email: {type: Sequilize.STRING}
})

module.exports = { Page, User }
