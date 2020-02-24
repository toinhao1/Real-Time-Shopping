const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const appConfig = require('./config/main-config.js');

// Item controller
const itemController = require('./controllers/item.controller')

const app = express();

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Config dotenv
appConfig.init();

// Bodyparser Middleware
app.use(express.json());

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const server = http.createServer(app);
const io = socketio(server);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  console.log('hello')
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', socket => {
  console.log('New user using the list.')

  // Receiving Items from client
  socket.on('addItem', (item) => {
    console.log('socketData: ' + JSON.stringify(item));
    itemController.addItem(io, item);
  });
  // Receiving Updated Items from client
  socket.on('updateItem', (item) => {
    console.log('socketData: ' + JSON.stringify(item));
    itemController.updateItem(io, item);
  });
  // Receiving Item to Delete
  socket.on('deleteItem', (id) => {
    console.log('socketData: ' + JSON.stringify(id));
    itemController.deleteItem(io, id);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
})

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server started on port ${port}`));
