const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

require('dotenv').config();

const PORT = process.env.PORT;

const databaseURL = process.env.ATLAS_URL;
mongoose.connect(databaseURL, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postsRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
}); 