// Getting the elements from the page
let guessButton = document.querySelector('#guessButton');
let resetButton = document.querySelector('#resetButton');
let guessRemain = document.querySelector('#guessRemain');
let resultMessage = document.querySelector('#resultMessage')
let guessedMessage = document.querySelector('#guessedMessage');

// Setting up some global variables we need to track guesses
let guessNum = 0;
let guesses = [];
let number = 0;

// Adding our functions to their respective buttons
guessButton.addEventListener('click', hiLow);
resetButton.addEventListener('click', initialise);
initialise();

function hiLow() {
    // Get the guessed value
    let guess = parseInt(document.querySelector('#number').value);

    // Briefly hide and then show the results again like in Ms. Buck's example
    resultMessage.style.display = 'none';
    guessedMessage.style.display = 'none';
    setTimeout(function() {
        resultMessage.style.display = 'block';
        guessedMessage.style.display = 'block';
    }, 100);
    // Checking to see if the guesses have been exhausted
    if (guessNum < 10) {
        // Check to see if the guessed number has already been guessed
        if (guesses.findIndex(num => num == guess) == -1) {
            // Final output based on the relation of the guess to the secret number
            if (guess == number) {
                resultMessage.innerHTML = 'Congrats! That is the right number! Click reset to start a new game.';
                guessNum = 5;
                guessRemain.innerHTML = 'Guesses remaining: 0';
            } else {
                resultMessage.innerHTML = (guess < number) ? 'The secret number is higher than your guess.' : 'The secret number is lower than your guess.';
                guesses.push(guess);
                guessNum++;
                guessedMessage.innerHTML = `Guessed numbers: ${guesses.toString()}`;
                guessRemain.innerHTML = `Guesses remaining: ${10 - guessNum}`;
            }
        } else {
            resultMessage.innerHTML = 'You have already guessed that value!';
        }
    } else {
        resultMessage.innerHTML = 'You have exhausted your guesses. Click reset to start again!';
    }
}

// Setting the secret number and wiping the slate clean
function initialise() {
    number = Math.floor(Math.random() * (100 - 1) + 1);
    guessNum = 0;
    guesses = [];
    resultMessage.style.display = 'none';
    guessedMessage.style.display = 'none';
    guessRemain.innerHTML = 'Guesses remaining: 10';
}
