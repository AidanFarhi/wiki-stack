const { Router } = require("express");

const router = new Router()

router.get('/', (req, res, next) => {
    res.send('You just used GET wiki')
})

router.post('/', (req, res, next) => {
    res.send('you just posted to wiki')
})

router.get('/add', (req, res, next) => {
    res.send('you just requested the add page form')
})

module.exports = router
