const { Router } = require("express");
const { Page, User } = require('../models')
const { wikiPage, main, addPage } = require('../views')

const router = new Router()

router.get('/', async (req, res, next) => {
    try {
        const allPages = await Page.findAll()
        res.send(main(allPages))
    } catch(err) { next(err) }
})

router.post('/', async (req, res, next) => {
    try {
        const [user, wasCreated] = await User.findOrCreate({ 
            where: { 
                name: req.body.name,
                email: req.body.email
            }
        })
        const page = await Page.create(req.body)
        page.setAuthor(user)
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) { next(error) }
});
   

router.get('/add', (req, res, next) => {
    const page = addPage()
    res.send(page)
})


router.get('/search', async (req, res, next) => {
    try {
        const pages = await Page.findByTag(req.query.search)
        console.log(pages)
        res.send(main(pages))
    } catch(err) { next(err) }
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        const author = await page.getAuthor()
        res.send(wikiPage(page, author))
    } catch(err) { next(err) }
});

// router.get('/users', async(req, res, next) => {
    //     try {
//         console.log('hit')
//         const users = await User.findAll()
//         res.send(userList(users))
//     } catch(err) { next(err) }
// })

// router.get('/:userId', async(req, res, next) => {
//     try {
//         const user = await User.findByPk(req.params.userId)
//         const pages = await Page.findAll({
//             where: {
//                 authorId: req.params.userId
//             }
//         })
//         res.send(userPages(user, pages))
//     } catch(err) { next(err) }
// })

module.exports = router
