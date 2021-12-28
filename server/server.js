const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.use(cors());
app.use('/', require('./routes/index.js'));
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, "client", "build")))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const url = "mongodb://localhost:27017/Storage"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully on port 27017!!!');
});


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => {
    console.log(`Server is listening at : http://localhost:${port}`);
});

