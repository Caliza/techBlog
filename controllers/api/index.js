const router = require('express').Router();
const userRoutes = require('./user-route');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
