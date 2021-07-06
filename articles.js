const express = require("express");
const article = require("./models/article");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getArticles = await article.find().limit();
    res.json(getArticles);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getSingleArticle = await article.findById(req.params.id);
    res.json(getSingleArticle);
  } catch (err) {
    res.status(501).json({ message: err });
  }
});

router.post("/", (req, res) => {
  const postArticle = new articles({
    title: req.body.title,
    body: req.body.body,
  });

  postArticle
    .save()
    .then(res.json("Save was successful"))
    .catch((err) => {
      res.status(501).json({ message: err });
    });
});

module.exports = router;
