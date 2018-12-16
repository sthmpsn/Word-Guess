//Statically define the alphabet to be use later
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var validGuesses = alphabet.split("");

//Static defint Array of Planet images
var planets = [
    "europa.jpg",
    "jupiter.jpg",
    "mars.jpg",
    "mercury.jpg",
    "moon.jpg",
    "neptune.jpg",
    "pluto.jpg",
    "saturn.jpg",
    "titan.jpg",
    "uranus.jpg",
    "venus.png"
];

var planetSelect = "earth"; // earth is always starting planet static in HTML

// Get the Element that will be updated with the User guesses, wins, losses, and remaining guesses
var playerWinsEl = document.getElementById("winResults");
var playerLossesEl = document.getElementById("lossResults");
var numGuessRemainEl = document.getElementById("guessRemaining");
var playerGuessEl = document.getElementById("guess");
var gameResultEl = document.getElementById("gameResult");
var warnBannerEl = document.getElementById("warnBanner");
var planetImgEl = document.getElementById("imgPlanet");

var winCounter = 0;
var lossCounter = 0;
var initGuessAllowed = 9;  // initialize the number of guesses to allowed before losing
var guessCounter = initGuessAllowed;

var compSelection = "";

function initNewGame() {
    compSelection = validGuesses[Math.floor(Math.random() * validGuesses.length)];  // new random letter chosen
    console.log("Computer Selection: " + compSelection);     //use the console to cheat
    guessCounter = initGuessAllowed;   //reset Counter
    warnBannerEl.textContent = ""; //reset warning
    
    displayGuessRemain();
    displayWins();
    displayLosses();
    displayGuess();
}

function randPlanet(){
    planetSelect = planets[Math.floor(Math.random() * planets.length)];  // new random planet chosen
    console.log(planetSelect);
    return planetSelect;
}

function displayGuessRemain() {
    numGuessRemainEl.textContent = guessCounter;     //display the number of guesses remaining
    numGuessRemainEl.setAttribute("class","alert-warning font-weight-bold");
}

function displayGuess(){
    playerGuessEl.textContent = "";
}

function displayWins() {
    playerWinsEl.textContent = winCounter;      //display the number of wins
}

function displayLosses() {
    playerLossesEl.textContent = lossCounter;      //display the number of Losses
}


initNewGame();

// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {
    var playerGuess = event.key.toLowerCase();

    if (validGuesses.indexOf(playerGuess) !== -1){
        if (!(playerGuessEl.textContent.includes(playerGuess))){
            if (guessCounter > 1) {
                if (playerGuess === compSelection) {
                    alert("You did it!  You cracked the code and save the planet!");
                    gameResultEl.textContent = 'You saved the planet but it\'s not over yet!!';
                    gameResultEl.setAttribute("class", "jumbotron text-center alert-success font-weight-bold");
                    winCounter++;
                    initNewGame();
                }
                else {
                    --guessCounter;
                    displayGuessRemain();
                    playerGuessEl.appendChild(document.createTextNode(playerGuess + "  |  "));
                    playerGuessEl.setAttribute("class", "alert-info");
                    console.log(playerGuess);
                }
            }
            else {
                alert("You lost, I'm doubting your code cracking abilities!");            
                gameResultEl.textContent = "Oh No! " + planetSelect.toUpperCase() + " was destroy, this new planet will have to do!!";
                gameResultEl.setAttribute("class", "jumbotron text-center alert-danger font-weight-bold");
                planetImgEl.setAttribute("src","assets/images/" + randPlanet());    //set a new random planet image
                planets.splice(planets.indexOf(planetSelect),1);   //remove the randomly selected planet from the array so it can't be chosen again...it was destroyed
                lossCounter++;
                initNewGame();
            }
        }
        else {
            console.log(playerGuess + " was already chosen, choose a different letter");
            warnBannerEl.textContent = "You already guessed \" " + playerGuess + " \" " + " please select a different letter";
            warnBannerEl.setAttribute("class", "warnings alert-warning text-center");            
        }
    }
    else {
        console.log(playerGuess + " is an invalid option");
        warnBannerEl.textContent = "\" " + playerGuess + " \" " + "is an invalid option, please select a letter";
        warnBannerEl.setAttribute("class", "warnings alert-warning text-center");
    }
};

