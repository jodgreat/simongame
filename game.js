
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function () {

    if (!started) {
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }

});


//function that click the button 
$(".btn").on("click", function () {
    // get the id of the button
    var userChosenColour = $(this).attr("id");
    //push the userChosen Color to the array userClickedPattern
    userClickedPattern.push(userChosenColour);
    // playSound
    playSound(userChosenColour);
    // adding Animation
    animatePress(userChosenColour);
    // nextSequence
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
    
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel

function checkAnswer(currentLevel) {

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); 
            }, 1000);

        }
    }

    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {  
        $("body").removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        }, 200);
        startOver();
        

    }
}


function nextSequence() {
    userClickedPattern = [];
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("level " + level);
    // Generate Random Numbers
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // select the button with the same id as the randomChosenColour

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //Javascript to play the sound for the button colour selected in
    playSound(randomChosenColour);
    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.



}

function playSound(name) {
    //Javascript to play the sound for the button colour selected in
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("." + currentColour).addClass("pressed");

    //Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);

}

//1. Create a new function called startOver().
function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
   
}

