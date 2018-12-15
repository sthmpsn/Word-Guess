//Statically define the alphabet to be use later
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var validGuesses = alphabet.split("");


// Get the Element that will be updated with the User guesses, wins, losses, and remaining guesses
var playerWinsEl = document.getElementById("winResults");
var playerLossesEl = document.getElementById("lossResults");
var numGuessRemainEl = document.getElementById("guessRemaining");
var playerGuessEl = document.getElementById("guess");
var gameResultEl = document.getElementById("gameResult");
var warnBannerEl = document.getElementById("warnBanner");

var winCounter = 0;
var lossCounter = 0;
var initGuessAllowed = 9;  // initialize the number of guesses to allowed before losing
var guessCounter = initGuessAllowed;

var compSelection = "";

function initNewGame() {
    compSelection = validGuesses[Math.floor(Math.random() * validGuesses.length)];  // new random letter chosen
    console.log("Computer Selection: " + compSelection);     //use the console to cheat
    guessCounter = initGuessAllowed;   //reset Counter
    displayGuessRemain();
    displayWins();
    displayLosses();
}


function displayGuessRemain() {
    numGuessRemainEl.textContent = guessCounter;     //display the number of guesses remaining
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

    if (validGuesses.indexOf(playerGuess) !== -1) {
        if (guessCounter !== 0) {
            if (playerGuess === compSelection) {
                alert("Whoa, you guessed my letter!");
                gameResultEl.textContent = 'You Won last Game!!';
                gameResultEl.setAttribute("class", "jumbotron text-center alert-success");
                winCounter++;
                initNewGame();
            }
            else {
                guessCounter--;
                displayGuessRemain();
                playerGuessEl.appendChild(document.createTextNode(playerGuess + "  |  "));
                playerGuessEl.setAttribute("class", "alert-info");
                console.log(playerGuess);
            }
        }
        else {
            alert("You lost, I'm doubting your psycic abilities!");            
            gameResultEl.textContent = 'You lost last Game!!';
            gameResultEl.setAttribute("class", "jumbotron text-center alert-danger");
            lossCounter++;
            initNewGame();
        }


    }
    else {
        console.log(playerGuess + " is an invalid option");
        warnBannerEl.textContent = "\" " + playerGuess + " \" " + "is an invalid option, please select a letter";
        warnBannerEl.setAttribute("class", "alert-warning text-center");
    }
};

