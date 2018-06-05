console.log('JS up and running');
let wordArray = [];
let guess = '';

function checkLetter() {
  // cross off input from letter list
  // IF no match, add input to wrong guess array
  // SHOW part of hanged man
  // IF match, show matched part of wordArray
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
    checkLetter();
  });

  $('.instructions-link').on('click', function(evt) {
    // changes to display (toggle)
    $('.instructions').toggle();
  });
});
