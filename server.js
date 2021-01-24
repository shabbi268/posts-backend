const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

require('dotenv').config();

const PORT = process.env.PORT;

const databaseURL = process.env.ATLAS_URL;
// Establishing the connection to cloud mongoose through URI
mongoose.connect(databaseURL, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// To support cross origin requests
app.use(cors());
// To parse the request into JSON
app.use(bodyParser.json());

app.use('/posts', postsRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
}); 