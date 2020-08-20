const { Router } = require("express");
const { Page, User } = require('../models')
const { wikiPage, main, addPage} = require('../views');
const editPage = require("../views/editPage");
const results = require('../views/results')

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
        res.send(results(pages))
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

router.get('/:slug/edit', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        const author = await page.getAuthor()
        res.send(editPage(page, author))
    } catch(err) { next(err) }
})

router.get('/:slug/delete', async (req, res, next) => {
    try {
        await Page.destroy({where: {slug: req.params.slug}})
        res.redirect('/wiki')
    } catch(err) { next(err) }
})

router.post('/:slug/edit', async (req, res, next) => {
    try {
        await Page.update({
            title: req.body.title,
            tags: req.body.tags,
            content: req.body.content,
            status: req.body.status
        },
        {
            where: {slug: req.params.slug}
        })
        res.redirect(`/wiki/${req.params.slug}`)
    } catch(err) { next(err) }
})

router.get('/:slug/similar', async(req, res, next) => {
    try {
        const page = await Page.findOne({where: {slug: req.params.slug}}) 
        console.log(page)
        const allPages = await Page.findByTag(page.tags)
        res.send(results(allPages))
    } catch(err) { next(err) }
})

router.get('/results', async(req, res, next) => {
    try {
        
    } catch(err) { next(err) }
})

module.exports = router
