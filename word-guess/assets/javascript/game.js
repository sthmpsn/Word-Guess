// Statically define the alphabet to check for valid guess
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var validGuesses = alphabet.split("");

// Array to select random word from 
var secretWords = [
    "rosebud",
    "buttercup",
    "predator",
    "alien"
];

var correctGuesses = [];     // Array to store the correctly guessed letters

// Static defint Array of Planet images
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
var compSelection = "";  //secret word selection

// Get the Element that will be updated with the User guesses, wins, losses, and remaining guesses
var playerWinsEl = document.getElementById("winResults");
var playerLossesEl = document.getElementById("lossResults");
var numGuessRemainEl = document.getElementById("guessRemaining");
var playerGuessEl = document.getElementById("guess");
var gameResultEl = document.getElementById("gameResult");
var warnBannerEl = document.getElementById("warnBanner");
var planetImgEl = document.getElementById("imgPlanet");
var secretWordEl = document.getElementById("secretWord");

var winCounter = 0;
var lossCounter = 0;
var initGuessAllowed = 9;  // initialize the number of guesses to allowed before losing a round
var guessCounter = initGuessAllowed;



function initNewRound() {
    correctGuesses = [];  // Clear the correctGuesses Array if entry from a previous game
    guessCounter = initGuessAllowed;   //reset Counter
    warnBannerEl.textContent = ""; //reset warning
    playerGuessEl.textContent = ""; //reset "Your Guesses so Far" 
    playerWinsEl.textContent = winCounter;      //display the number of wins
    playerLossesEl.textContent = lossCounter;      //display the number of Losses

    compSelection = secretWords[Math.floor(Math.random() * secretWords.length)];  // new random secret word chosen
    compChars = compSelection.split("");
    console.log("Computer Selection: " + compSelection, "Split Results:" + compChars);     //use the console to cheat

    for (var i=0; i < compChars.length; i++){
        correctGuesses.push("-");             // fill the array with "-" in place of the char of the word so that the secret is not displayed
    }   

    displaySecret(correctGuesses);   // Pass the correctGuesses array to the Display Secret function to display the array on screen
    displayGuessRemain();

}

function initNewGame() {
    location.reload();
}


// Take in a Word array and display it on screen
function displaySecret(wordArray) {
    secretWordEl.textContent = "";
    for (var i=0; i < wordArray.length; i++){
        var divNode = document.createElement("div");
        var textNode = document.createTextNode(wordArray[i]);
        divNode.setAttribute("class", "secretLetter");
        divNode.appendChild(textNode);
        secretWordEl.appendChild(divNode);
    }
}

function randPlanet(){
    planetSelect = planets[Math.floor(Math.random() * planets.length)];  // new random planet chosen
    console.log("Random Planent selected:" + planetSelect);
    return planetSelect;
}

function displayGuessRemain() {
    numGuessRemainEl.textContent = guessCounter;     //display the number of guesses remaining
    numGuessRemainEl.setAttribute("class","alert-warning font-weight-bold");
}




initNewRound();


// alert("You did it!  You cracked the code and save the planet!");


// Next, we give JavaScript a function to execute when onkeyup event fires.

    
    document.onkeyup = function (event) {
    var playerGuess = event.key.toLowerCase();

    if (validGuesses.includes(playerGuess) === true){
        if (!(playerGuessEl.textContent.includes(playerGuess))){              //If the player didn't already try to guess this letter then proceed
            if (guessCounter >= 1) {                                         //Still have remaining guess
                if (compSelection.includes(playerGuess)) {            // quick check if the Secret Word includes the player's letter guess
                    for (var i=0; i < (compChars.length); i++){
                        if (compChars[i] === playerGuess){       // Loop through and find the indexes of the chars of the letter guessed
                            correctGuesses[i] = playerGuess;              // update the " - " with the actual letter
                            displaySecret(correctGuesses);
                            console.log(correctGuesses);
                            console.log("Match Found: " + playerGuess + "  |    Secret: " + compChars[i])
                        }   
                    }
                }
                else {
                    guessCounter--;
                    displayGuessRemain();
                    var divNode = document.createElement("div");
                    var textNode = document.createTextNode(playerGuess);
                    divNode.appendChild(textNode);
                    divNode.setAttribute("class", "guessLetter");
                    playerGuessEl.appendChild(divNode);
                    console.log(playerGuess);
                }
                if (!(correctGuesses.includes("-"))){     // Game Winner Logic.  If the Correct Guess Array doesn't contain any more "-" then all letters must have been found
                    gameResultEl.textContent = "You did it, you Saved " + planetSelect.toUpperCase() + " !!";
                    gameResultEl.setAttribute("class", "jumbotron text-center alert-success font-weight-bold");
                    winCounter++;
                    initNewRound();
                 }  
            }
            else {   //loss logic
                alert("You lost, I'm doubting your code cracking abilities!");       
                var planetName = planetSelect.replace(/\.[^/.]+$/, "");        // strip off the file extension from the name
                gameResultEl.textContent = "Oh No! " + planetName.toUpperCase() + " was destroy, this new planet will have to do!!";
                gameResultEl.setAttribute("class", "jumbotron text-center alert-danger font-weight-bold");
                planetImgEl.setAttribute("src","assets/images/" + randPlanet());    //set a new random planet image
                planets.splice(planets.indexOf(planetSelect),1);   //remove the randomly selected planet from the array so it can't be chosen again...it was destroyed
                lossCounter++;
                initNewRound();
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



// gameResultEl.textContent = "GAME OVER!!";
// gameResultEl.setAttribute("class", "jumbotron text-center alert-danger font-weight-bold");
// warnBannerEl.textContent = "Click to Replay";
// warnBannerEl.setAttribute("class", "warnings alert-success text-center"); 
// warnBannerEl.addEventListener('click', function(event){
//     initNewRound();
// });




// var playAgain = confirm("Would you like to play again?");
// if (playAgain === true){
//     initNewRound();
// }