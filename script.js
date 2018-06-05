console.log('JS up and running');
let wordArray = [];
let guess = '';
let guessedLetters = [];

function makeWordCells() {
  for (var x = 0; x < wordArray.length; x++) {
    $('.word-cells-main').append(
      '<div class="word-letter ' + [x] + '">' + wordArray[x] + '</div>'
    );
    $('.word-cells-secondary').append('<div class="word-underline"></div>');
  }
}

function pushGuess() {
  guessedLetters.push(guess);
  $('.guessed').text(guessedLetters);
}

function checkGuess() {
  for (var i = 0; i < wordArray.length; i++) {
    let order = $.inArray(guess, wordArray);
    if (order >= 0) {
      $('.word-letter')
        .eq(order)
        .css('visibility', 'visible');
    } else {
      
    }
  }
}

$(document).ready(function() {
  $('.button-player-one').on('click', function(evt) {
    $('.instructions').css('display', 'none');
    $('.player-one').css('display', 'none');
    $('.player-two').css('display', 'block');
    let word = $('.word')
      .val()
      .toUpperCase();
    wordArray = word.split('');
    makeWordCells();
  });

  $('.button-player-two').on('click', function(evt) {
    let guessInput = $('.guess')
      .val()
      .toUpperCase();
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
