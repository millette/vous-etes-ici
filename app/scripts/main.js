$(() => {
  'use strict'
  $('a[href*="#"]:not([href="#"])').click(function () {
    $(this).animatescroll({ easing: 'easeOutBack' })
  })
})
