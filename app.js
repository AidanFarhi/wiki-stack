
const express = require('express')
const morgan = require('morgan')
const models = require('./models')
const layout = require('./views/layout')

const app = express()
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/wiki', require('./routes/wiki'))
app.use('/user', require('./routes/user'))


const PORT = 3000;
const init = async() => {
    await models.User.sync({force: true})
    await models.Page.sync({force: true})
    app.listen(PORT, ()=> {
        console.log(`Server is listening on port ${PORT}`)
    })
}

init()

app.get('/', async (req, res, next) => {
    try {
        res.redirect('/wiki')
    } catch(err) { next(err) }
})

// Handle our errors
app.use((err, req, res, next) => {
    console.error(err.message)
    if (err.message === 404) {
        res.status(404).send('404 not found')
    } else {
        res.status(500).send('Internal Server Error')
    }
})
