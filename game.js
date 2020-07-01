var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var index = 0;

$(document).keypress(function(e) {
  if (!started) {
    $("h1").text("level  " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAns(index);
  index++;
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (index === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    index = 0;
    userClickedPattern = [];
  }
});

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("level  " + level);

  console.log(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAns(index) {
  console.log("chk_index" + index);
  console.log("gam" + gamePattern);
  console.log("user" + userClickedPattern);
  if (gamePattern[index] !== userClickedPattern[index]) {
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
  }
}
