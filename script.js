var schedulerTasks = [];

var listByHour = function (){
    var firstHour = moment().set('hour', 9); // Sets the first hour of the day (9 AM)
    var taskOrderedList = $(".task-list") // Selects the HTML <ol> element with the class="task-list"
    for (i=0; i<9; i++){
        // Creates one list item for each hour of the day. Sets the attribute id="i" for each list item.
        var taskLi = $("<li>").addClass("task-list-item row").attr("id", i);

        // Creates one hour marker paragraph element.
        var hourMarker = $("<p>").addClass("hour col-1 pt-2");
        // Adds one hour for each interaction of the loop. Format is 9AM to 5PM; 
        var thisHour = moment(firstHour).add(i,"h").format("hA");
        var momentHour = moment(firstHour).add(i, "h");
        // Adds the thisHour variable to the paragraph element hourMarker
        hourMarker.text(thisHour);
        
        // Creates a paragraph element and adds bootstrap classes to it. Adds the text from the schedulerTasks array.
        var taskText = $("<p>").addClass("task-text col-8 pt-2").text(schedulerTasks[i]);
        
        taskOrderedList.append(taskLi);
        taskLi.append(hourMarker).append(taskText);

        taskTimeEvaluate(momentHour, taskText);
    };
};

// Evaluates the current time against when each task is due
var taskTimeEvaluate = function (momentHour, taskText) {
    if (moment().isAfter(momentHour)) {
        $(taskText).addClass("past");
    };
    if (moment().isSame(momentHour, "hour")) {
        $(taskText).addClass("present");
    }
    if (moment().isBefore(momentHour)) {
        $(taskText).addClass("future");
    }
};

// Replaces the task-list paragraph with a textarea for editing
$(".task-list").on("click", ".task-text", function () {
    var text = $(this)
        .text()
        .trim();

    var textInput = $('<textarea>')
        .addClass("col-8")
        .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// save task when clicking out of the text area form
$(".task-list").on("blur", "textarea", function () {
    // get the textarea's current value/text
    var newText = $(this)
        .val()
        .trim();

    // get the parent list item element id
    var id = $(this)
        .parent()
        .attr("id");
        
    // update the schedulerTasks array with the newText from input
    schedulerTasks[id] = newText;
    saveTasks();

    // recreate p element
    var taskP = $("<p>")
        .addClass("task-text col-8 pt-2")
        .text(newText);

    var momentId = moment().set('hour', 9).add(id, "h");
    taskTimeEvaluate(momentId, taskP);

    // replace textarea form with p element
    $(this).replaceWith(taskP);
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