var db = require("../models");
const { sequelize } = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if (req.session.loggedin) {
      res.redirect("/loggedin");
    } else {
      res.render("index");
    }
    
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/loggedin", function (req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    if (req.session.loggedin) {
      // Render home page
      var hbsObject = {
        id: req.session.userID,
        username: req.session.username
      };
      res.render("loggedin", hbsObject);
    } else {
      // Redirect to login page
      res.redirect("/");
    }
  });

  app.get("/calendar", function (req, res) {
    if (req.session.loggedin) {
      // Render calendar
      var hbsObject = {
        id: req.session.userID,
        username: req.session.username
      };
      res.render("calendar", hbsObject);
    } else {
      // Redirect to login page
      res.redirect("/");
    }
  });

  app.get("/map", function (req, res) {
    if (req.session.loggedin) {
      // Render map
      var hbsObject = {
        id: req.session.userID,
        username: req.session.username
      };
      res.render("map", hbsObject);
    } else {
      // Redirect to login page
      res.redirect("/");
    }
  });

  app.get("/profile", function (req, res) {
    if (req.session.loggedin) {
      db.User.findAll({
        where: {
            id: req.session.userID
        }
    }).then(function (results) {
            firstname = results[0].firstname;
            lastname = results[0].lastname;
            city = results[0].city;
            state = results[0].state;
            zipCode = results[0].zipcode;
            skillLevel = results[0].skilllevel;
            oppSkillLevel = results[0].oppskilllevel;

            // Render profile
      var hbsObject = {
        id: req.session.userID,
        username: req.session.username,
        useremail: req.session.useremail,
        firstName: firstname,
        lastName: lastname,
        city: city,
        state: state,
        zipCode: zipCode,
        skillLevel: skillLevel,
        oppSkillLevel: oppSkillLevel
      };
      res.render("profile", hbsObject);
        
    });
      
    } else {
      // Redirect to login page
      res.redirect("/");
    }
  });

    // testing the overlap compare
  app.get("/schedule", function(req,res) {
    res.render("schedule");
  });

  app.get("/logout", function(req,res) {
    req.session.destroy();
    res.redirect("/");
  });

  // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

  // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
};