const express = require('express');
const path = require('path');
const routes = new express.Router();
const uploadConfig = require('./config/upload');
const uploader = require('multer')(uploadConfig);

const PostController = require('./controllers/post-controller');
const LikeController = require('./controllers/like-controller');


routes.get('/', (req, res) => {
  res.json('hello darkness');
});

routes.use(
  '/imgs',
  express.static(
    path.resolve(__dirname, '..', 'uploads', 'resized')
  )
);


routes.get('/posts', PostController.showAll);

routes.post(
  '/posts',
  uploader.single('image'),
  PostController.register
);

routes.post('/posts/:postId/like', LikeController.register);


module.exports = routes;