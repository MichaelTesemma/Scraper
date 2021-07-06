const express = require('express')
const articles = require('./models/article')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const getArticles = await articles.find().limit()
        res.json(getArticles);
    } catch(err){
        res.send(err)
    }
})
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const getSingleArticle = await articles.findById(id)
        res.json(getSingleArticle)
    } catch(err){
        res.send(err);
        console.log(err)
    }
})
router.post('/', async (req, res) => {
    try{
        const newArticle = await articles({
            title: req.body.title,
            body: req.body.body,
        })
        newArticle.save()
        .then (res.json(newArticle))
        
    } catch(err){
        console.log(err)
    }
})

module.exports = router