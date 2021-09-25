const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.pwd);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

  router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end()
      })
    }
    else {
      res.status(404).end()
    }
  })

  router.post('/', (req, res) => {
    User.create({
      user_name: req.body.user_name,
      email: req.body.email,
      pwd: req.body.pwd,
      twitter: req.body.twitter,
      github: req.body.github
    })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.user_name = dbUserData.user_name;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    });
  });

  module.exports = router