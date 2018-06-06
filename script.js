console.log('JS up and running');
let modal = $('#my-modal');
let btn = $('#my-btn');
let span = $('.close');
let wordArray = [];
let guess = '';
let guessedLetters = [];
let wrong = 0;

function makeWordCells() {
  for (var x = 0; x < wordArray.length; x++) {
    $('.word-cells-main').append(
      '<div class="word-letter ' + [x] + '">' + wordArray[x] + '</div>'
    );
    $('.word-cells-secondary').append('<div class="word-underline"></div>');
  }
}

function verifyGuess() {
  if (guessedLetters.length === 0) {
    if (guess === '') {
      return;
    } else {
      pushGuess();
      checkGuess();
    }
  } else {
    let order = $.inArray(guess, guessedLetters);
    if (order >= 0) {
      console.log('This letter has already been guessed.');
      $('.guess')
        .val('')
        .replaceWith(
          '<input type="text" class="guess" maxlength="1" placeholder="Letter already guessed!">'
        );
      return;
    } else {
      $('.guess')
        .val('')
        .replaceWith(
          '<input type="text" class="guess" maxlength="1" placeholder="Input a letter">'
        );
      pushGuess();
      checkGuess();
    }
  }
}

function pushGuess() {
  guessedLetters.push(guess);
  $('.guessed').text(guessedLetters);
}

function checkGuess() {
  let order = $.inArray(guess, wordArray);
  if (order >= 0) {
    for (var i = 0; i < wordArray.length; i++) {
      if (guess === wordArray[i]) {
        $('.word-letter')
          .eq(i)
          .css('visibility', 'visible');
      }
    }
  } else {
    wrong++;
    showWrong();
  }
}

function showWrong() {
  if (wrong === 1) {
    $('.man').html('<img src="images/head.jpg" alt="hang man!">');
  } else if (wrong === 2) {
    $('.man').html('<img src="images/body.png" alt="hang man!">');
  } else if (wrong === 3) {
    $('.man').html('<img src="images/left-arm.png" alt="hang man!">');
  } else if (wrong === 4) {
    $('.man').html('<img src="images/right-arm.png" alt="hang man!">');
  } else if (wrong === 5) {
    $('.man').html('<img src="images/left-leg.png" alt="hang man!">');
  } else {
    $('.man').html('<img src="images/right-leg.png" alt="hang man!">');
    alert('Game Over! Player One Wins!');
  }
}

$(document).ready(function() {
  $('.button-assigner').on('click', function(evt) {
    $('.assigner').css('display', 'none');
    $('.guesser').css('display', 'block');
    let word = $('.word')
      .val()
      .toUpperCase();
    wordArray = word.split('');
    makeWordCells();
  });

  $('.button-guesser').on('click', function(evt) {
    let guessInput = $('.guess')
      .val()
      .toUpperCase();
    guess = guessInput;
    verifyGuess();
  });

  btn.on('click', function(evt) {
    modal.css('display', 'block');
  });

  span.on('click', function(evt) {
    modal.css('display', 'none');
  });

  window.on('click', function(evt) {
    if (event.target == modal) {
      modal.css('display', 'none');
    }
  });
});
