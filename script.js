var schedulerTasks = [];

var listByHour = function (){
    var firstHour = moment().set('hour', 9); // Sets the first hour of the day (9 AM)
    var taskOrderedList = $(".task-list") // Selects the HTML <ol> element with the class="task-list"
    for (i=0; i<9; i++){
        // Creates one list item for each hour of the day. Sets the attribute id="i" for each list item.
        var taskLi = $("<li>").addClass("task-list-item row").attr("id", i);

        // Creates one hour marker paragraph element.
        var hourMarker = $("<p>").addClass("hour text-center col-2 pt-2");
        // Adds one hour for each interaction of the loop. Format is 9AM to 5PM; 
        var thisHour = moment(firstHour).add(i,"h").format("hA");
        var momentHour = moment(firstHour).add(i, "h");
        // Adds the thisHour variable to the paragraph element hourMarker
        hourMarker.text(thisHour);
        
        // Creates a paragraph element and adds bootstrap classes to it. Adds the text from the schedulerTasks array.
        var taskText = $("<p>").addClass("task-text").text(schedulerTasks[i]);
        var taskDiv = $("<div>").addClass("task-div col-8 col-md-9 pt-2").append(taskText);

        // Creates the save button
        var icon = $("<i>").addClass("bi bi-file-earmark-lock-fill align-center text-center");
        var saveDiv = $("<div>").addClass("saveBtn col-2 col-md-1").append(icon);
        
        taskOrderedList.append(taskLi);
        taskLi.append(hourMarker).append(taskDiv).append(saveDiv);

        taskTimeEvaluate(momentHour, taskDiv);
    };
};

// Evaluates the current time against when each task is due
var taskTimeEvaluate = function (momentHour, taskDiv) {
    if (moment().isAfter(momentHour)) {
        $(taskDiv).addClass("past");
    };
    if (moment().isSame(momentHour, "hour")) {
        $(taskDiv).addClass("present");
    }
    if (moment().isBefore(momentHour)) {
        $(taskDiv).addClass("future");
    }
};

// Replaces the task-list paragraph with a textarea for editing
$(".task-list").on("click", ".task-div", function () {
    var textField = $(this)
        .find(".task-text")
    
    var text = $(textField)
        .text()
        .trim();

    var textInput = $('<textarea>')
        .addClass("w-100 p-0 h-100")
        .val(text);

    $(textField).replaceWith(textInput);
    textInput.trigger("focus");
});

// Replaces the textarea input with a new task
$(".task-list").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var newText = $(this)
        .val()
        .trim();

    // get the parent list item element id
    var id = $(this)
        .parent()
        .attr("id");
        
    // recreate p element
    var taskP = $("<p>")
    .addClass("task-text")
    .text(newText);
    
    var momentId = moment().set('hour', 9).add(id, "h");
    taskTimeEvaluate(momentId, taskP);
    
    // replace textarea form with p element
    $(this).replaceWith(taskP);
});
   
// update the schedulerTasks array with the newText from input
$(".task-list").on("click", ".saveBtn", function () {
    console.log("button clicked")
    // get the parent list item element id
    var id = $(this)
        .parent()
        .attr("id");
        
    var newText = $(this).parent().find(".task-text").text();

    schedulerTasks[id] = newText;
    saveTasks();
});
    
var saveTasks = function () {
    // Converts the schedulerTasks array into a string and writes it to the localStorage under the name schedulerTasks
    localStorage.setItem("schedulerTasks", JSON.stringify(schedulerTasks));
};

var loadTasks = function () {
    schedulerTasks = JSON.parse(localStorage.getItem("schedulerTasks"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!schedulerTasks) {
        schedulerTasks = [];
    }
};

loadTasks();
listByHour();

setInterval(function () {
    location.reload(); 
}, 1800000);