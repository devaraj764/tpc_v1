const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


// running express
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'))
app.set('view engine', 'ejs');

// import routes
const auth = require('./routes/auth.route.js');
const studentsRoute = require('./routes/students.route.js');
const adminRoute = require('./routes/admin.route.js');

// middleware
app.use('/students', cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH'],
}));

app.use('/', auth);
app.use('/students', studentsRoute);
app.use('/admin', adminRoute);

// Routes
app.get('/', (req, res) => {
    res.json("Hello world!!!");
});

// connect to db
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.DB_CONNECTION,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (err) {
                console.log(err);
            } else { console.log("Connected to MongoDB") }
        }
    );

} catch (e) {
    console.log("could not connect");
}


// listening to server
app.listen(process.env.PORT || 80, () => {
    console.log(`listening on http://localhost`);
});

