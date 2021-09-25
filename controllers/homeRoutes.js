const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["user_name", "github"],
          },
        },
        {
          model: User,
          attributes: ["user_name", "github"]
        }
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;