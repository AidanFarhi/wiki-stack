const { Router } = require("express");
const { Page, User } = require('../models')
const { userList, userPages } = require('../views')

const router = new Router()

router.get('/', async(req, res, next) => {
    try {
        console.log('hit in users.js')
        const users = await User.findAll()
        res.send(userList(users))
    } catch(err) { next(err) }
})

router.get('/:userId', async(req, res, next) => {
    try {
        const user = await User.findAll(req.params.userId)
        // const pages = await Page.findAll({
        //     where: {
        //         authorId: req.params.userId
        //     }
        // })
        res.send(userPages(user, pages))
    } catch(err) { next(err) }
})

module.exports = router
