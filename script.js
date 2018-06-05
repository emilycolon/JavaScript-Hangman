console.log('JS up and running');
let wordArray = [];
let guess = '';
let guessedLetters = [];

function pushGuess() {
  // push guess to guessedLetters and display
  guessedLetters.push(guess);
  $('.guessed').text(guessedLetters);
}

function checkGuess() {
  wordArray.forEach(guess => {
    if (guess === wordArray[i]) {
      // IF match, show matched part of wordArray
    } else {
      // IF no match, SHOW part of hanged man
      
    }
  });
}

$(document).ready(function() {
  $('.button-player-one').on('click', function(evt) {
    // changes to display (hide/show)
    $('.instructions').css('display', 'none');
    $('.player-one').css('display', 'none');
    $('.player-two').css('display', 'block');
    // capture input and add to array
    let word = $('.word').val();
    wordArray = word.split('');
    // take wordArray and add to gallows div as "blank" spaces
  });

  $('.button-player-two').on('click', function(evt) {
    // capture letter input
    let guessInput = $('.guess').val();
    guess = guessInput;
    // check input against wordArray
    pushGuess();
    checkGuess();
  });

  $('.instructions-link').on('click', function(evt) {
    // changes to display (toggle)
    $('.instructions').toggle();
  });
});
