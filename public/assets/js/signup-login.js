// create account
$("#create-button").on("click", function() {
    var username = $("#createUsername").val().trim();
    var password = $("#createPassword").val().trim();
    var email = $("#createEmail").val().trim();

    $.ajax({
        type: "POST",
        url: "/api",
        data: {
            username: username,
            password: password,
            email: email
        }
    }).then(function (response) {
        console.log(response);
        if(response==="formNotComplete") {
            $("#create-msg").empty();
            var newPara = $("<p>").text("Please complete the registration form");
            $("#create-msg").append(newPara);
        } else if (response==="userAlreadyExists") {
            $("#create-msg").empty();
            var newPara = $("<p>").text("Account already exists with that username");
            $("#create-msg").append(newPara);
        } else if (response==="userCreateSuccess") {
            $("#create-msg").empty();
            var newPara = $("<p>").text("Account successfully created. You may now login.");
            $("#create-msg").append(newPara);
            $("#create-msg").append('<p>Go to <a href="/">LOGIN PAGE</a>');
            $("#create-form").hide();
        }
    });
});

// login
$("#login-button").on("click", function() {
    var username = $("#loginUsername").val().trim();
    var password = $("#loginPassword").val().trim();

    $.ajax({
        type: "POST",
        url: "/api/login",
        data: {
            username: username,
            password: password
        }
    }).then(function (response) {
        console.log(response);
        if(response==="noPassOrUser") {
            $("#login-msg").empty();
            var newPara = $("<p>").text("Must enter Username and Password");
            $("#login-msg").append(newPara);
        } else if (response==="wrongPassOrUser") {
            $("#login-msg").empty();
            var newPara = $("<p>").text("Incorrect Username and/or Password");
            $("#login-msg").append(newPara);
        } else if (response==="loggedin") {
            window.location.href="/loggedin";
        }
    });
});