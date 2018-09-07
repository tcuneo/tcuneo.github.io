$(document).ready(function () {
    var options = [
        {
            question: "Who was the original lead singer for The Grateful Dead?", 
            choice: ["Michael Cuneo", "Jerry Garcia", "Bob Weir", "Sean Winner"],
            answer: 1,
            photo: "assets/images/DBear.png"
         },
         {
             question: "In what year was The Grateful Dead formed?", 
            choice: ["1960", "1971", "1967", "1965"],
            answer: 3,
            photo: "assets/images/DBear.png"
         }, 
         {
             question: "Who was the original drummer for the Grateful Dead?", 
            choice: ["Jerry Garcia", "Sean Brennan", "Bill Kruetzmann", "Phil Lesh" ],
            answer: 2,
            photo: "assets/images/DBear.png"
        }, 
        {
            question: "About how many different songs did The Grateful Dead play live?", 
            choice: ["750", "500", "250", "1000" ],
            answer: 1,
            photo: "assets/images/DBear.png"
        }, 
        {
            question: "How did the musicians choose a name for their band?", 
            choice: ["Dictionary", "A Psychic", "A Dream", "Brainstorming" ],
            answer: 0,
            photo: "assets/images/DBear.png"
        }, 
        {
            question: "Roughly how many albums have The Grateful Dead sold worldwide?", 
            choice: ["70 million", "35 million", "50 million", "15 million" ],
            answer: 1,
            photo: "assets/images/DBear.png"
        }, 
        {
            question: "How many top 10 hits did The Grateful Dead?", 
            choice: ["Scarlet Begonias", "Uncle John's Band", "Truckin", "Freind of the Devil" ],
            answer: 2,
            photo: "assets/images/DBear.png"
        }, 
        {
            question: "Which name did The Grateful Dead originally go by?", 
            choice: ["Warlocks", "Dead", "Wandering Wizards", "The Other Ones" ],
            answer: 0,
            photo: "assets/images/DBear.png"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    $("#reset").hide();
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })

    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerlog").html("<p>No More Time The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionlog").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                
                userChoice.attr("data-guessvalue", i);
                $("#answerlog").append(userChoice);
    }
    
    $(".answerchoice").on("click", function () {
     
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerlog").html("<p>Correctomundo</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerlog").html("<p>BOOP :p The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerlog").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerlog").empty();
            timer= 20;
    
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionlog").empty();
            $("#questionlog").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerlog").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerlog").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerlog").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 2000);
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerlog").empty();
        $("#questionlog").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })