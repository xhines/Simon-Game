var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// A way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

// Use to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function() {
    if (!started) {

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    // Check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //If the user got the most recent answer right in step up, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong")

        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");

        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("text-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        // Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence() {

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = []

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //1. Select the button with the same id as the randomChosenColour
    //2. Animate a flash to the button selected in step 1.    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

    // Add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");

    // Use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {

    // Inside this function, need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}