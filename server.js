require("dotenv").config();
var express = require("express");
var path = require("path");
var mysql = require("mysql");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.password,
    database: "test_cal_one"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/calendar", function (req, res) {
    res.sendFile(path.join(__dirname, "calendar.html"));
});

app.get("/api/calendar", function (req, res) {

    connection.query("SELECT * FROM events", function(err, result) {
        if (err) throw err;
        return res.json(result);
    });

    
});

app.post("/api/calendar", function (req, res) {

    connection.query("INSERT INTO events SET ?",
    req.body,
    function(err, res) {
        if (err) throw err;
        console.log(res);

    });

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});