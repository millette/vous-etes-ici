'use strict'

$(function () {
  // console.log('\'Allo \'Allo!')
  $('a[href*="#"]:not([href="#"])').click(function(e) {
    $(this).animatescroll({ easing: 'easeOutBack' })
    /*
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']')
      if (target.length) {
        e.preventDefault()
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600, 'linear') // 'swing' by default
      }
    }
    */
  })
})
