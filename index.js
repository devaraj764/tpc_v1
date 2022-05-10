const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// running express
const app = express();
app.use(bodyParser.json());

// import routes
const auth = require('./routes/auth.route.js');
const studentsRoute = require('./routes/students.route.js');

// middleware
app.use('/', cors());
app.use('/', auth);
app.use('/students', studentsRoute);

// Routes
app.get('/', (req, res) => {
    res.json("Hello world");
});

// connect to db
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.DB_CONNECTION,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );

} catch (e) {
    console.log("could not connect");
}


// listening to server
app.listen(process.env.PORT || 3000, () => {
    console.log("listning on port 3000");
});

