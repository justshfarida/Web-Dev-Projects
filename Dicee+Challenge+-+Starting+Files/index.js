
var randomNumber=Math.floor(Math.random()*6)+1;
var randomNumber2=Math.floor(Math.random()*6)+1;

function randomDice(randomNum, image)
{
    if (randomNum===1)
        {
            document.getElementsByClassName(image)[0].setAttribute("src", "./images/dice1.png")
        }
        else if(randomNum===2)
        {
            document.getElementsByClassName(image)[0].setAttribute("src", "./images/dice2.png")
        }
        else if(randomNum===3)
        {
            document.getElementsByClassName(image)[0].setAttribute("src", "./images/dice3.png")
        }
        else if(randomNum===4)
        {
            document.getElementsByClassName(image)[0].setAttribute("src", "./images/dice4.png")
        }
        else if(randomNum==5)
        {
            document.getElementsByClassName(image)[0].setAttribute("src", "./images/dice5.png")
        }
        else if(randomNum==6)
            {
                document.getElementsByClassName(image)[0].setAttribute("src", "./images/dice6.png")
            }
}
randomDice(randomNumber, "img1");
randomDice(randomNumber2, "img2");

function compare(num1, num2)
{
    if (num1>num2)
    {
        document.querySelector("h1").textContent="🚩Player 1 wins!"
    }
    else if (num2>num1)
    {
        document.querySelector("h1").textContent="Player 2 wins!🚩"
    }
    else
    {
        document.querySelector("h1").textContent="Draw!"
    }
}
compare(randomNumber, randomNumber2)