console.log('JS up and running');

$(document).ready(function() {
  $('.button-player-one').on('click', function(evt) {
    $('.instructions').css('display', 'none');
    $('.player-one').css('display', 'none');
    $('.player-two').css('display', 'block');
  });

  $('.instructions-link').on('click', function(evt) {
    $('.instructions').toggle();
  });
});
