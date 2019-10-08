//globals
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

function middleInBetweenNumnbers(min, max) {
  return Math.floor((max+min)/2);
}

async function whichGame(){
  let game = await ask('Which game do you want to play? 1 = computer guesses, 2 = user guesses ANY OTHER KEY TO EXIT');
  if(game === '1'){
    computerGuessGame();
  } else if(game ==='2'){
    humanGuessGame();
  } else{
    //TODO after completing a game, and before choosing a new game, 'not a game, goodbye' is logged to the console. why?
    console.log('not a game, goodBye!');
    process.exit();
  }
}
whichGame();


//game play
async function humanGuessGame(){
  let compGeneratedNum = Math.floor((Math.random() * 100));
  let numGuesses = 0;
  let previousGuessArr = [];

  async function getUserGuess(){
    if(numGuesses === 0){
      console.log("I'm thinking of a number between 1 and 100, what is your guess?");
    }
    let userGuess = await ask("What is your guess? ");


    if(previousGuessArr.includes(userGuess)){
      console.log("YOU ALREADY TRIED THAT NUMBER... TRY AGAIN...");
      getUserGuess();
    }
    let previous = previousGuessArr[previousGuessArr.length - 1]
    previousGuessArr.push(userGuess);
    numGuesses++;

    if(userGuess < compGeneratedNum){
      if(previous > userGuess){
        console.log("You are going in the wrong direction... PLEASE READ THE INSTRUCTIONS... ");
      }
      console.log("Computer generated number is higher than your guess. Try again.");
      getUserGuess();
    }
    if(userGuess > compGeneratedNum){

      if(previous < userGuess){
        console.log("You are going in the wrong direction... PLEASE READ THE INSTRUCTIONS... ");
      }

      console.log("Computer generated number is lower than your guess. Try again.");
      getUserGuess();
    }
    if(userGuess == compGeneratedNum){
      console.log('YOU WIN!!! It took you ' + numGuesses + '  guesses!');
      computerGuessGame();
    }
  }
  getUserGuess();
}

async function computerGuessGame(){

  let secretNum = await ask('What is your secret number that you want the computer to guess?\nBetween 1 and 100. ');
  min = 1;
  max = 100;
  numGuesses = 1;
  askUserIfNumIsCorrect();

async function askUserIfNumIsCorrect(){
  let number = middleInBetweenNumnbers(min,max);
  let agree = await ask("Is your Number... " + number + " ...? Y/N ");
  if(agree === 'Y'){
    console.log("Computer wins the game!!!\nIt only took said computer " + numGuesses + " tries!");
    //whichGame();
    humanGuessGame();
  }
  if(agree === 'N'){
      let lowerOrHigher = await ask("Is the number lower or higher? L or H ");
      if(lowerOrHigher === 'L'){
        max = number - 1;
        numGuesses++;
        askUserIfNumIsCorrect();
      }
      if(lowerOrHigher === 'H'){
        min = number + 1;
        numGuesses++;
        askUserIfNumIsCorrect();
      }

    }
  }
}