$(document).ready(function() { 
 
    var yourWins = 0;
    var yourLosses = 0;
    var yourTotalScore = 0;
    var blue = 0;
    var yellow = 0;
    var green = 0;
    var red = 0;
    var computerNum = 0;
    
    $("#score").html(yourTotalScore);
 
 generateRandomNum = function() {
        var random = Math.floor(Math.random() * 100 + 19);
        computerNum += random;
        return random;
    }
    $("#randomNum").html(generateRandomNum());

 generateCrystalNum = function() {
        var random = Math.floor(Math.random() * 12 + 1);
        return random;
    }
  initialCrystalNum = function() {
        blue += generateCrystalNum();
        red += generateCrystalNum();
        green += generateCrystalNum();
        yellow += generateCrystalNum();
    }

    initialCrystalNum();
    $("button").on("click", function() {
        if(this.id === "image1") {
            yourTotalScore += blue;
        } else if(this.id === "image2") {
            yourTotalScore += yellow;
        } else if(this.id === "image3") {
            yourTotalScore += red;
        } else if(this.id === "image4") {
            yourTotalScore += green;
        }
        $("#score").html(yourTotalScore);
        winOrLose();
    });

  	winOrLose = function() {
        if(yourTotalScore === computerNum) {
            yourWins += 1;
            $("#win").html(yourWins);
            alert("You win!");
            reset();   
        } else if(yourTotalScore > computerNum) {
            yourLosses += 1;
            $("#loss").html(yourLosses);
            alert("You lose.");
            reset();
        }
    }
 	reset = function() {  
        yourTotalScore = 0;
        $("#score").html(yourTotalScore);
        blue = 0;
        green = 0;
        yellow = 0;
        red = 0;
        computerNum = 0;
        initialCrystalNum();
        $("#randomNum").html(computerNum += generateRandomNum());
    }
});