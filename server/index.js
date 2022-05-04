const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// running express
const app = express();
app.use(bodyParser.json());

// import routes
const studentsRoute = require('./routes/students.route.js');
const auth = require('./routes/auth.route.js')

// middlewares
app.use('/', auth);
app.use('/students', studentsRoute);
// app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.json("Hello world");
});

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
         console.log('connected to DB');
    });

// listening to server
app.listen(process.env.PORT || 3000, () => {
    console.log("listning on port 3000");
});

