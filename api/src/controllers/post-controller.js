const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/post');


module.exports = {

  async showAll(req, res) {
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
  },

  async register(req, res) {

    const {
      author,
      place,
      description,
      hashtags
    } = req.body;

    const {
      filename: image
    } = req.file;

    const [previousFileName] = image.split('.');
    const permanentFileName = `${previousFileName}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({
        quality: 70
      }).toFile(
        path.resolve(req.file.destination, 'resized', permanentFileName)
      );

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename
    });

    req.io.emit('post', post);

    return res.json(post);
  }

};