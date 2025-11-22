const router = require('express').Router();
const Post = require('../models/Post');

// 1. CREATE POST
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) { res.status(500).json(err); }
});

// 2. GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) { res.status(500).json(err); }
});

// 3. DELETE POST (Sirf apni post)
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check karein ki kya delete karne wala wahi hai jisne post kiya tha?
    if (post.author.toString() === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("You can only delete your posts");
    }
  } catch (err) { res.status(500).json(err); }
});

// 4. LIKE / UNLIKE POST
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } }); // Like karo
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } }); // Unlike karo
      res.status(200).json("Post unliked");
    }
  } catch (err) { res.status(500).json(err); }
});

// 5. ADD COMMENT
router.put('/:id/comment', async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      postedBy: req.body.userId,
      posterName: req.body.userName
    };
    // Post ke andar 'comments' array me naya comment daal do
    await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment }
    });
    res.status(200).json(comment);
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;