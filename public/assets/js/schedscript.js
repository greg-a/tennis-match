// Make button to get all of USer 1's current events

$("#user-one-events").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/api/events/" + 1
    }).then(function(result) {
        console.log(result);
        $("#events-div").empty();
        let newBtn = $("<button>").attr("id","user-one-overlap").text("User 1 Overlap");
        $("#events-div").append($("<br>"));
        $("#events-div").append(newBtn);
        for(let i=0;i<result.length;i++) {
            let newDiv = $("<div>");
            let titleName = $("<h3>").text(result[i].title);
            newDiv.append(titleName);
            let startPara = $("<p>").text("Start: " + result[i].start);
            newDiv.append(startPara);
            let endPara = $("<p>").text("End: " + result[i].end);
            newDiv.append(endPara);
            let overlapDiv = $("<div>").attr("id", "event-" + result[i].id);
            let overlapPara = $("<h4>").text("Overlapping events:");
            overlapDiv.append(overlapPara);
            newDiv.append(overlapDiv);
            newDiv.append($("<hr>"));
            $("#events-div").append(newDiv);
        }
    }).catch(function(err) {
        console.log(err);
    })
});

// Make button to display overlap events from other users

$(document).on("click", "#user-one-overlap", function() {
    $.ajax({
        method: "GET",
        url: "/api/overlap",
        data: {
            userNum: 1
        }
    }).then(function(result) {
        console.log(result);

        for(let i=0;i<result.length;i++) {
            let newDiv = $("<div>");
            let titleName = $("<h3>").text(result[i].title);
            newDiv.append(titleName);
            let eventUser = $("<p>").text("User ID: " + result[i].UserId);
            newDiv.append(eventUser);
            let eventUserName = $("<p>").text("User Name: " + result[i].eventUserName);
            newDiv.append(eventUserName);
            let startPara = $("<p>").text("Start: " + result[i].start);
            newDiv.append(startPara);
            let endPara = $("<p>").text("End: " + result[i].end);
            newDiv.append(endPara);
            newDiv.append($("<p>").text("-----------"));
            $("#event-" + result[i].overlapWithEventID).append(newDiv);
        }
    }).catch(function(err) {
        console.log(err);
    })
});