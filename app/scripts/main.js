/* global $ */
'use strict';

$(function () {
  // console.log('\'Allo \'Allo!')
  $('a[href*="#"]:not([href="#"])').click(function() {
    $(this).animatescroll({ easing: 'easeOutBack' });
  });
});

