
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res, next) => {
    try {
        
        res.send('Hello World')
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

const PORT = 1337;
app.listen(PORT, ()=> {
    console.log(`App listening on port: ${PORT}`)
})
