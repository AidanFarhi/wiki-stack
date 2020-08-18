const { Router } = require("express");
const addPage = require('../views/addPage.js')

const router = new Router()

router.get('/', (req, res, next) => {
    res.send('You just used GET wiki')
})

router.post('/', (req, res, next) => {
    res.json(req.body)
})

router.get('/add', (req, res, next) => {
    const page = addPage()
    res.send(page)
})

module.exports = router
