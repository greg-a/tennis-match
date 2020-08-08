// sets today's date and time as default value
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

// rounds time up to the next hour
var timeStart = today.getHours() + 1 + ":00";
// adds to hours to timeStart
var timeEnd = today.getHours() + 3 + ":00";

today = yyyy + '-' + mm + '-' + dd;

$(".date").attr("value", today);
$("#eventStartTime").attr("value", timeStart);
$("#eventEndTime").attr("value", timeEnd);

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