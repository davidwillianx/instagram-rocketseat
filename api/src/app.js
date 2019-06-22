const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');


const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose
  .connect('mongodb+srv://instafeed:ulCQEzTaQIx2hKB1@rocketseat-instagram-db-dmcmv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(routes)


server.listen(8000);