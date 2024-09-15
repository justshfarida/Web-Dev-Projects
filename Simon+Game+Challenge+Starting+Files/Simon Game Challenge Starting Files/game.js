var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];

var gameStart=false;

var level=0;

$(document).keydown(function()
{
    if(!gameStart)
    {
      $("h1").text("Level "+level);
      nextSequence();
      gameStart=true;
    }
})
$("div.btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name)
{
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern=[];// reseting user patterns
  level+=1;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
      if (userClickedPattern.length === gamePattern.length) {
        console.log("Success");
        // Move to the next level after a short delay
        setTimeout(nextSequence, 1000);
    }
    }
    else{
      console.log("Wrong");
      $("body").addClass("game-over");
      setTimeout(function()
    {
      $("body").removeClass("game-over")
      
    },200)
      startOver();
      
    }
}
function startOver()
{
  level=0;
  gameStart=false;
  gamePattern=[];
  $("h1").text("Game Over! Press any key to restart!  ");

}
