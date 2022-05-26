function init() {
    displayToday();
    colorSchedule();
    storageSetup();
    displayStorage();
    saveEvent();
}

// Prints current day
function displayToday() {
    let today = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(today);
}

// Fills the colors of the schedule.
// Based on the time
function colorSchedule() {
    let now = moment().format("H");
    
    // Loops through all hours
    // Checks against now and sets color
    for(let i = 8; i <= 18; i++) {
        let hour = $(`#${i}`);
        let section = $(`#${i}`).children().eq(1);
        if(hour > now) {
            section.addClass("past");
        }else if(hour === now) {
            section.addClass("present");
        }else {
            section.addClass("future");
        }
    }
}


function storageSetup() {
    for(let i = 8; i <= 18; i++) {
        if(localStorage.getItem(`hour ${i}`) === null) {
            localStorage.setItem(`hour ${i}`, "");
        }
    }
}

function displayStorage() {
    for(let i = 8; i <= 18; i++) {
        let storage = localStorage.getItem(`hour ${i}`);
        $(`#${i}`).children().eq(1).val(storage);
    }


}

function saveEvent() {
    $(".row").on("click", ".saveBtn", function(event){
        event.preventDefault();

        saveBtn = $(event.target);
        let content = saveBtn.parent().children().eq(1).val();
        let index = saveBtn.parent().attr("id");
        localStorage.setItem(`hour ${index}`, content);

    });
}

init();

console.log($("#8").children().eq(0).text());
let x = $("#8");
// localStorage.setItem(`hour 13`, "gjhggjhgj");