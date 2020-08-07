// create event
$("#event-btn").on("click", function (event) {
    event.preventDefault();
    var start = $("#eventStartDate").val().trim();
    if ($("#eventStartTime").val().trim() === "") {

    } else {
        start += "T" + $("#eventStartTime").val().trim();
    }
    var end = $("#eventEndDate").val().trim();
    if ($("#eventEndTime").val().trim() === "") {

    } else {
        end += "T" + $("#eventEndTime").val().trim();
    }
    var newEvent = {
        title: $("#eventTitle").val().trim(),
        start: start,
        end: end
    };
    console.log(newEvent);

    $.post("/api/calendar", newEvent).then(function (response) {
        if (response==="eventCreated") {
            $("#eventStartDate").val("");
            $("#eventStartTime").val("");
            $("#eventEndDate").val("");
            $("#eventEndTime").val("");
            $("#eventTitle").val("");

            $("#event-msg").empty();
            var newPara = $("<p>").text("Event successfully added!");
            $("#event-msg").append(newPara);
            
        }
    });
});