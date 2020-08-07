// update profile
$("#update-btn").on("click", function (event) {
    event.preventDefault();
    var firstName = $("#firstname").val().trim();
    var lastName = $("#lastname").val().trim();
    var city = $("#inputCity").val().trim();
    var state = $("#inputState").val();
    var zipCode = $("#inputZip").val().trim();
    var skillLevel = $("#skill-level").val();
    var oppSkillLevel = $("#skill-level-opponent").val();

    console.log(skillLevel);
    var updateObj = {};
    if (firstName==="") {

    } else {
        updateObj.firstname = firstName;
    }

    if (lastName==="") {

    } else {
        updateObj.lastname = lastName;
    }

    if (city==="") {

    } else {
        updateObj.city = city;
    }

    if (state==="Choose...") {

    } else {
        updateObj.state = state;
    }
    if (zipCode==="") {
        
    } else {
        updateObj.zipcode = zipCode;
    }
    if (skillLevel==="Choose...") {
        
    } else {
        updateObj.skilllevel = skillLevel;
    }
    if (oppSkillLevel==="Choose...") {
        
    } else {
        updateObj.oppskilllevel = oppSkillLevel;
    }

    

    console.log(updateObj);

    $.ajax({
        method: "PUT",
        url: "/api",
        data: updateObj
    }).then(function(response) {
        if (response==="profileUpdated") {
            window.location.href = "/profile";
        }
    });

    
});