
const express = require('express')
const morgan = require('morgan')
const models = require('./models')
const notFound= require('./views/notFound')
const internalError = require('./views/internalError')

const app = express()
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/wiki', require('./routes/wiki'))
app.use('/users', require('./routes/user'))


const PORT = 3000;
const init = async() => {
    await models.User.sync({force: true})
    await models.Page.sync({force: true})
    app.listen(PORT, ()=> {
        console.log(`Server is listening on port ${PORT}`)
    })
}

init()

app.get('/', async(req, res, next) => {
    try {
        res.redirect('/wiki')
    } catch(err) { next(err) }
})

app.get('/users', async (req, res, next) => {
    console.log('hit')
    try {
        res.redirect('/users')
    } catch(err) { next(err) }
})

// Handle our errors
app.use((req, res, next) => {
    res.status(404).send(notFound())
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(internalError())
})
