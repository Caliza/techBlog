const router = require('express').Router();
const { Post, User, Comment } = require('../model');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const projectData = await Post.findAll({
            include: [
                {
                    model: User,
                    //   attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = projectData.map((project) => project.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
      order: [
        [
          { model: Comment },
          "date_created",
          'DESC'
        ]
      ]
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('singlepost', { ...post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const postData = await Post.findAll({ 
          include: [User],
          where: { user_id: req.session.user_id }, 
        });

        const posts = postData.map((postData) => postData.get({ plain: true }));
        // const user = postData[0].user.username;

        res.render('profile', {
            //user,
            posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id)
      if (postData) {
        const post = postData.get({
          plain: true
        })
        res.render('editpost', {
          post
        })
      }
      else(
        res.status(404).end()
      )
    } catch (error) {
      res.redirect('login')
    }
})

module.exports = router;
