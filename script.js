console.log('JS up and running');
let wordArray = [];
let guess = '';
let guessedLetters = [];
let wrong = 0;
let correct = 0;
let theme = 'paper';

function changeTheme(selection) {
  theme = selection;
  $('body').attr('class', theme);
  $('.man').html(
    '<img src="images/empty-gallows' +
      theme +
      '.png" class="img-responsive" alt="hang man!">'
  );
}

function makeWordCells() {
  for (let i = 0; i < wordArray.length; i++) {
    $('.word-cells-main').append(
      '<div class="' + theme + '-word-letter ' + [i] + '"></div>'
    );
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
  $('.guessed')
    .text(guessedLetters)
    .css('visibility', 'visible');
}

function checkGuess() {
  let order = $.inArray(guess, wordArray);
  if (order >= 0) {
    for (let i = 0; i < wordArray.length; i++) {
      if (guess === wordArray[i]) {
        $('.' + theme + '-word-letter')
          .eq(i)
          .text(wordArray[i]);
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
      '<img src="images/head' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 2) {
    $('.man').html(
      '<img src="images/body' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 3) {
    $('.man').html(
      '<img src="images/left-arm' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 4) {
    $('.man').html(
      '<img src="images/right-arm' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else if (wrong === 5) {
    $('.man').html(
      '<img src="images/left-leg' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    return;
  } else {
    gameOver('loss');
  }
}

function timer() {
  // found original countdown timer code here: https://stackoverflow.com/questions/7235816/how-to-create-a-countdown-timer-with-jquery
  let sec = 180;
  setInterval(function() {
    sec--;
    // found solution to convert seconds to MM:SS here: https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    function fmtMSS(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    }
    $('.Timer').text(fmtMSS(sec));
    if (sec == 0) {
      $('.Timer').css('visibility', 'hidden');
      clearInterval(timer);
      gameOver('loss');
    }
  }, 1000);
}

function gameOver(x) {
  if (x === 'loss') {
    $('.man').html(
      '<img src="images/you-lose' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    setTimeout(function() {
      $('#loss-modal').css('display', 'block');
    }, 1500);
  } else {
    $('.man').html(
      '<img src="images/you-win' +
        theme +
        '.png" class="img-responsive" alt="hang man!">'
    );
    setTimeout(function() {
      $('#win-modal').css('display', 'block');
    }, 1500);
  }
}

function smallScreen() {
  if ($(window).width() <= 500) {
    $('.row').addClass('d-flex flex-column');
    $('.six').removeClass('col-6');
  }
}

function bigScreen() {
  if ($(window).width() > 500) {
    $('.row').removeClass('d-flex flex-column');
    $('.six').addClass('col-6');
  }
}

$(document).ready(function() {
  smallScreen();

  $(window).resize(function() {
    size = $(window).width();
    if (size <= 500) {
      smallScreen();
    } else {
      bigScreen();
    }
  });

  $('.button-paper').on('click', function(evt) {
    changeTheme('paper');
  });

  $('.button-chalk').on('click', function(evt) {
    changeTheme('chalk');
  });

  $('.button-assigner').on('click', function(evt) {
    let word = $('.word')
      .val()
      .toUpperCase();
    wordArray = word.split('');
    if (word === '') {
      return;
    } else {
      $('.assigner').css('display', 'none');
      $('.themes').css('display', 'none');
      $('.guesser').css('display', 'block');
      makeWordCells();
      timer();
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

  // found modal code here: https://www.w3schools.com/howto/howto_css_modals.asp
  $('#my-btn').on('click', function(evt) {
    $('#my-modal').css('display', 'block');
  });

  $('.close').on('click', function(evt) {
    $('#my-modal').css('display', 'none');
  });

  $('.game-over').on('click', function(evt) {
    $('#my-modal').css('display', 'none');
    location.reload();
  });
});
