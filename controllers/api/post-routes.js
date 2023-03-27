const router = require('express').Router();
const { Post } = require('../../model');
// const { route } = require('../home-routes');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            content: req.body.description,
            title: req.body.name,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth,
    async (req, res) => {
        try {
            const postData = await Post.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });

            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            res.status(200).json(postData);
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.put('/edit/:id', withAuth,
    async (req, res) => {
        try {
            const post = await Post.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(204).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    });

module.exports = router;