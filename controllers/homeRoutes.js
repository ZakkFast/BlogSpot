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
          attributes: ["user_name", "github"],
        },
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

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "subject_name", "date_created", "body_content"],
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
        attributes: ["user_name", "github"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render("post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});



module.exports = router;
