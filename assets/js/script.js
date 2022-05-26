// Variables for save and notify functions
let isMessageClearing = false;
let clearingMessageCode = 0;


function init() {
    displayToday();
    colorSchedule();
    storageSetup();
    displayStorage();
    saveEvent();
}

// Prints current day
// Updates the time every hour
function displayToday() {
    function updateDate() {
        let today = moment().format("dddd, MMMM Do YYYY");
        $("#currentDay").text(today);
    }
    setInterval(updateDate(),(1000*60*60));
}

// Fills the colors of the schedule.
// Based on the time
function colorSchedule() {
    let now = moment().format("H");
    now = parseInt(now);
    // Loops through all hours
    // Checks against now and sets color
    for(let i = 8; i <= 18; i++) {
        let hour = $(`#${i}`).attr("id");
        let section = $(`#${i}`).children().eq(1);
        hour = parseInt(hour);
        if(hour < now) {
            section.addClass("past");
        }else if(hour === now) {
            section.addClass("present");                               
        }else {
            section.addClass("future");
        }
    }
}

// Checks if there are previous saves
// If not sets empty string for each hour
function storageSetup() {
    for(let i = 8; i <= 18; i++) {
        if(localStorage.getItem(`hour ${i}`) === null) {
            localStorage.setItem(`hour ${i}`, "");
        }
    }
}

// Displays the content from local storage
// Either the previous entries
// Or empty strings from previous function
function displayStorage() {
    for(let i = 8; i <= 18; i++) {
        let storage = localStorage.getItem(`hour ${i}`);
        $(`#${i}`).children().eq(1).val(storage);
    }
}

// Waits for click on save button
// Checks if text area is empty
// If not sends the tect area content to local storage
function saveEvent() {
    $(".row").on("click", ".saveBtn", function(event){
        event.preventDefault();

        saveBtn = $(event.target);
        let content = saveBtn.parent().children().eq(1).val();
        let index = saveBtn.parent().attr("id");
        localStorage.setItem(`hour ${index}`, content);
        if(localStorage.getItem(`hour ${index}`)) {
            notifySave();
        }
    });
}

// Provides a message when saving to localStorage
// Clears the message after three seconds
// Extends the message if function called within time limit
function notifySave() {
    if(!isMessageClearing) {
        let container = $(".container");
        container.prepend("<p>Appointment added to localStorage ✅</p>");
        container.children().eq(0).css("margin-left", "400px");
        clearNotify();
    } else {
        isMessageClearing = false;
        clearTimeout(clearingMessageCode);
        clearNotify();
    }
}

// Clears the message after local storage
function clearNotify() {
    let container = $(".container");
    isMessageClearing = true;
    clearingMessageCode = setTimeout(function() {
        container.children().eq(0).remove();
        isMessageClearing = false;
    }, 3000);
} 

init();