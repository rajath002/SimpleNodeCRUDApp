const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// const ejs = require("ejs");
const config = require(path.join(__dirname, "config", "config.json"));
const app = express();

port = 3000;

mongoose.connect(config.mongoURI, { useNewUrlParser: true })
.then(async con => {
    console.log("Connection with mongo established successfully..");
})
.catch(err => {
    console.log('Ouuch!! Something went wrong!', err);
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require(path.join(__dirname, "routes", "auth.v1.route.js")));

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page NOT FOUND'});
});
app.listen(3000, () => {
    console.log("Node app is listening on port : ", port);
});