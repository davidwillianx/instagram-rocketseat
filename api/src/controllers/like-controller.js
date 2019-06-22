const Post = require('../models/post');

module.exports = {

  async register(req, res) {
    const postFound = await Post.findById(req.params.postId);
    postFound.likes += 1;

    await postFound.save();

    req.io.emit('like', post);

    return res.json(postFound);
  }

};