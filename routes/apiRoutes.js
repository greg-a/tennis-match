var db = require("../models");
// const { request } = require("express");
var crypto = require('crypto');
const { sequelize } = require("../models");

module.exports = function (app) {
    // login in auth
    app.post("/api/login", function (req, res) {
        var username = req.body.username;
        var password = req.body.password;


        if (username && password) {
            var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");
            db.User.findAll({
                where: {
                    username: username,
                    password: hashed_password
                }
            }).then(function (results) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.userID = results[0].id;
                    req.session.username = results[0].username;
                    req.session.useremail = results[0].email;
                    // res.redirect("/loggedin");
                    res.send("loggedin");
                } else {
                    res.send("wrongPassOrUser");
                }
            });

        } else {
            res.send("noPassOrUser");
        }

    });

    // Create account
    app.post("/api", function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;

        if (username && password && email) {
            var accountGetObj = {
                username: username
            };

            db.User.findAll({ where: accountGetObj }).then(function (results) {
                // console.log("this works: " + results.length);
                if (results.length === 0) {
                    var hashed_password = crypto.createHash("sha1").update(req.body.password).digest("hex");
                    var postObj = {
                        username: username,
                        password: hashed_password,
                        email: email
                    }
                    db.User.create(postObj).then(function (results2) {
                        res.send("userCreateSuccess");
                    });

                } else {
                    res.send("userAlreadyExists");
                }
            });

        } else {
            res.send("formNotComplete");
        }
    });

    app.put("/api", function(req,res) {
        // console.log("UPDATE VALUES: " + JSON.parse(req.body));
        // console.log("STATE: " + typeof req.body.state);
        // console.log("USERID: " + req.session.userID);
        db.User.update(
            req.body,
            {
                where: {
                    id: req.session.userID
                }
            }
        ).then(function(result) {
            // res.json(result);
            res.send("profileUpdated");
        })
    });

    // create event
    app.post("/api/calendar", function(req,res) {
        if (req.session.loggedin) {
            db.Event.create(req.body).then(function (results) {
                res.send("eventCreated");
            });
        } else {
            res.status(400).end();
        }
        
    });

    // get events for calendar
    // Protect API so people can't see stored events via Postman, etc????
    app.get("/api/calendar", function(req, res) {
        if (req.session.loggedin) {
            db.Event.findAll({}).then(function(results) {
                res.json(results);
            });
        } else {
            res.status(400).end();
        }
        
    });

    // Delete an example by id
    //   app.delete("/api/examples/:id", function(req, res) {
    //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
    //       res.json(dbExample);
    //     });
    //   });
};