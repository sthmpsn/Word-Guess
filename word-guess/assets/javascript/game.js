// Statically define the alphabet to check for valid guess
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var validGuesses = alphabet.split("");

// Define Array + objects and add object to the array
var vulcan = {name:"vulcan", hint:"Spock"};
var chewy = {name:"chewy", hint:"Wookie"};
var predator = {name:"predator", hint:"Get to the Chopper!"};
var alien = {name:"alien", hint:"Prometheus"};
var yoda = {name:"yoda", hint:"Wise and green he is"};

var secretWords = [];
secretWords.push(vulcan,chewy,predator,alien,yoda);  // add objects to the array


console.log(secretWords);
console.log(secretWords[2].hint);


var correctGuesses = [];     // Array to store the correctly guessed letters

// Static defint Array of Planet images
var earth = {name:"EARTH", filename:"earth.jpg"}
var europa = {name:"EUROPA", fileName:"europa.jpg"};
var jupiter = {name:"JUPITER", fileName:"jupiter.jpg"};
var mars = {name:"MARS", fileName:"mars.jpg"};
var mercury = {name:"MERCURY", fileName:"mercury.jpg"};
var moon = {name:"MOON", fileName:"moon.jpg"};
var neptune = {name:"NEPTUNE", fileName:"neptune.jpg"};
var pluto = {name:"PLUTO", fileName:"pluto.jpg"};
var saturn= {name:"SATURN", fileName:"saturn.jpg"};
var titan = {name:"TITAN", fileName:"titan.jpg"};
var uranus = {name:"URANUS", fileName:"uranus.jpg"};
var venus = {name:"VENUS", fileName:"venus.png"};

var planets = [];
planets.push(earth,europa,jupiter,mars,mercury,moon,neptune,pluto,saturn,titan,uranus,venus);  // add planet objects to the array

console.log(planets);


var planetSelect = planets[0]; // earth is always starting planet static in HTML
planets.splice(planets.indexOf(planetSelect),1);
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
var hintEl = document.getElementById("hint");
var missileEl = document.getElementById("imgMissile");

var winCounter = 0;
var lossCounter = 0;
var initGuessAllowed = 9;  // initialize the number of guesses to allowed before losing a round
var guessCounter = initGuessAllowed;
var randNum = 0;


function initNewRound() {
    correctGuesses = [];  // Clear the correctGuesses Array if entry from a previous game
    guessCounter = initGuessAllowed;   //reset Counter
    warnBannerEl.textContent = ""; //reset warning
    playerGuessEl.textContent = ""; //reset "Your Guesses so Far" 
    playerWinsEl.textContent = winCounter;      //display the number of wins
    playerLossesEl.textContent = lossCounter;      //display the number of Losses
    randNum = Math.floor(Math.random() * secretWords.length);
    compSelection = secretWords[randNum].name;  // new random secret word chosen
    hintEl.textContent = secretWords[randNum].hint;
    
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
    planetSelect = planets[randNum];  // new random planet chosen
    console.log("Random Planent selected:" + planetSelect);
    return planetSelect;
}

function displayGuessRemain() {
    numGuessRemainEl.textContent = guessCounter;     //display the number of guesses remaining
    numGuessRemainEl.setAttribute("class","alert-warning font-weight-bold");
}

function winRound(){
     // Game Winner Logic.  If the Correct Guess Array doesn't contain any more "-" then all letters must have been found
     gameResultEl.textContent = "You did it, you Saved " + planetSelect.name + " !!";
     gameResultEl.setAttribute("class", "jumbotron text-center alert-success font-weight-bold");
     winCounter++;
     missileAnimation();
     initNewRound();
}

function loseRound() {
    // Lose Game Logic

    if (planets.length === 0){
        gameOver();
    }
    else{
        alert("You lost, I'm doubting your code cracking abilities!");       
        gameResultEl.textContent = "Oh No! " + planetSelect.name + " was destroy, this new planet will have to do!!";
        gameResultEl.setAttribute("class", "jumbotron text-center alert-danger font-weight-bold");
        planetImgEl.setAttribute("src","assets/images/" + randPlanet().fileName);    //set a new random planet image
        planets.splice(planets.indexOf(planetSelect),1);   //remove the randomly selected planet from the array so it can't be chosen again...it was destroyed
        lossCounter++;
        initNewRound();
    }
}

function gameOver() {
    gameResultEl.textContent = "GAME OVER!!";
    gameResultEl.setAttribute("class", "jumbotron text-center alert-danger font-weight-bold");
    warnBannerEl.textContent = "Click to Replay";
    warnBannerEl.setAttribute("class", "warnings alert-success text-center"); 
    planetImgEl.setAttribute("src","assets/images/deathstar-explode.gif");    //death star explode gif
    planetImgEl.setAttribute("id","imgDeathStar");    //death star explode gif
    missileEl.setAttribute("class", "hidden");
    warnBannerEl.addEventListener('click', function(event){
        initNewGame();
    });
}

function missileAnimation(callback){

    missileEl.setAttribute("class", "img-fluid missileDivert");
    initNewRound();
}


initNewRound();


// Next, we give JavaScript a function to execute when onkeyup event fires.
    
document.onkeyup = function (event) {
    var playerGuess = event.key.toLowerCase();
    missileEl.removeAttribute("class");  // reset animation

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
                    if (guessCounter < 1){
                        loseRound();
                    }
                }
                if (!(correctGuesses.includes("-"))){     // Game Winner Logic.  If the Correct Guess Array doesn't contain any more "-" then all letters must have been found
                  winRound();
                }  
            }
            else {   //loss logic
                loseRound();
                
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



