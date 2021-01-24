const router = require('express').Router();
let Posts = require('../models/posts');

router.route('/').get((req, res) => {
  Posts.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const date = req.body.date;

  const newPost = new Posts({
    title,
    description,
    date,
  });

  newPost.save()
  .then(() => res.json('Post created and added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Posts.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted successfully.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {
      posts.title = req.body.title;
      posts.description = req.body.description;
      posts.date = Date.parse(req.body.date);

      posts.save()
        .then(() => res.json('Post successfully updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;