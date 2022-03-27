var schedulerTasks = {};

var listByHour = function(){
    var hour = moment().set('hour', 9); // Sets the first hour of the day (9 AM)
    var taskOrderedList = $(".task-list") // Selects the HTML <ol> element with the class="task-list"
    for (i=0; i<9; i++){
        // Creates one list item for each hour of the day
        var taskLi = $("<li>").addClass("task-list-item row");

        // Creates one hour marker paragraph element.
        var hourMarker = $("<p>").addClass("hour col-2 pt-2");
        // Adds one hour for each interaction of the loop. Format is 9AM to 5PM; 
        var thisHour = moment(hour).add(i,"h").format("hA");
        // Adds the thisHour variable to the paragraph element hourMarker
        hourMarker.text(thisHour);
        
        var taskText = $("<span>").addClass("task-text col-8 pt-2").text("Example");

        taskOrderedList.append(taskLi);
        taskLi.append(hourMarker).append(taskText);
    };
};

listByHour();