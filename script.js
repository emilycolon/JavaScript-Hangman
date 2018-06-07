console.log('JS up and running');
let wordArray = [];
let guess = '';
let guessedLetters = [];
let wrong = 0;
let correct = 0;

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
    pushGuess();
    checkGuess();
    $('.guess').val('');
  } else {
    let order = $.inArray(guess, guessedLetters);
    if (order >= 0) {
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
        correct++;
      }
    }
  } else {
    wrong++;
    showWrong();
  }
  if (correct === wordArray.length) {
    gameOver();
  }
}

function showWrong() {
  if (wrong === 1) {
    $('.man').html(
      '<img src="images/head.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 2) {
    $('.man').html(
      '<img src="images/body.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 3) {
    $('.man').html(
      '<img src="images/left-arm.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 4) {
    $('.man').html(
      '<img src="images/right-arm.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 5) {
    $('.man').html(
      '<img src="images/left-leg.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else {
    gameOver('loss');
  }
}

function gameOver(x) {
  if (x === 'loss') {
    $('.man').html(
      '<img src="images/you-lose.png" class="img-responsive" alt="hang man!">'
    );
  } else {
    $('.man').html(
      '<img src="images/you-win.png" class="img-responsive" alt="hang man!">'
    );
  }
}

$(document).ready(function() {
  $('.button-assigner').on('click', function(evt) {
    let word = $('.word')
      .val()
      .toUpperCase();
    wordArray = word.split('');
    if (word === '') {
      return;
    } else {
      $('.assigner').css('display', 'none');
      $('.guesser').css('display', 'block');
      makeWordCells();
    }
  });

  $('.button-guesser').on('click', function(evt) {
    let guessInput = $('.guess')
      .val()
      .toUpperCase();
    guess = guessInput;
    if (guess === '') {
      return;
    } else {
      verifyGuess();
    }
  });

  $('#my-btn').on('click', function(evt) {
    $('#my-modal').css('display', 'block');
  });

  $('.close').on('click', function(evt) {
    $('#my-modal').css('display', 'none');
  });
});
