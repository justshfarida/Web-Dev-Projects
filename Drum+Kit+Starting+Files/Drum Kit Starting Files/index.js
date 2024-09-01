//var soundList=["./sounds/crash.mp3","./sounds/kick-bass.mp3","./sounds/snare.mp3","./sounds/tom-1.mp3","./sounds/tom-2.mp3","./sounds/tom-3.mp3","./sounds/tom-4.mp3"];
for(let i=0;i<document.querySelectorAll("button").length;i++){
    
document.querySelectorAll("button")[i].addEventListener("click",function(){
    // 1st way
// var audio=new Audio(soundList[i]);
// audio.play();
this.style.color="white";
 //2nd way
var buttonInnerHTML=this.innerHTML;
makeSound(buttonInnerHTML);
buttonAnimation(buttonInnerHTML);
});

}

document.addEventListener("keydown", function(event){
    var pressedKey=event.key;
    makeSound(pressedKey);
    buttonAnimation(pressedKey);

});
function makeSound(pressedKey)
{
    switch(pressedKey)
    {
        case "w":
            var audio=new Audio("./sounds/crash.mp3");
            audio.play();
        break;
        case "a":
            var audio=new Audio("./sounds/kick-bass.mp3"); 
            audio.play();
        break;
        case "s":
            var audio=new Audio("./sounds/snare.mp3");
            audio.play();
        break;
        case "d":
            var audio=new Audio("./sounds/tom-1.mp3");
            audio.play();
        break;
        case "j":
            var audio=new Audio("./sounds/tom-2.mp3");
            audio.play();
        break;
        case "k":
            var audio=new Audio("./sounds/tom-3.mp3");
            audio.play();
        break;
        case "l":
            var audio=new Audio("./sounds/tom-4.mp3");
            audio.play();
        break;
    }
    
}
function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (activeButton) {
        activeButton.classList.add("pressed");
        setTimeout(function () {
            activeButton.classList.remove("pressed");
        }, 1000);
    }
}