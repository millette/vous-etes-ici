/* global page, Modernizr */
$(() => {
  'use strict'

  const $app = $('#app').parent()

  const anchorer = () => {
    $('a[href*="#"]:not([href="#"])').click(function (ev) {
      $(this).animatescroll({ easing: 'easeOutBack' })
      ev.preventDefault()
    })
  }

  const pathname = (u) => {
    const el = document.createElement('a')
    el.href = u
    return el.pathname
  }

  const formStuff = () => {
    $('form').submit(function (ev) {
      const action = this.action || this.baseURI
      const toPage = pathname(action)
      ev.preventDefault()
      page(toPage)
    })
  }

  const showPage = (path, name, effect) => {
    if (!effect) { effect = 'rollIn' } // zoomInDown lightSpeedIn
    console.log('PAGE', name)
    $app.load(path + ' #app', () => {
      $('#app').addClass('animated ' + effect)
      anchorer()
      formStuff()
    })
  }

  const index = () => showPage('/', 'index')
  const about = () => showPage('/a-propos', 'à propos')
  const contact = () => showPage('/contact', 'contact')
  const firstVisit = () => showPage('/premiere-visite', 'première visite')
  const notfound = () => showPage('/404', 'not found', 'zoomInLeft')

  const pageExit = (ctx, next) => {
    console.log('PAGE exit')
    $('#app').addClass('animated rollOut') // zoomOutRight lightSpeedOut
    setTimeout(next, 500)
  }

  const setupPages = () => {
    anchorer()
    formStuff()
    page('/', index)
    page('/a-propos', about)
    page('/premiere-visite', firstVisit)
    page('/contact', contact)
    page('*', notfound)
    page.exit(pageExit)
    page({
      dispatch: false,
      hashbang: !Modernizr.history
    })
  }

  setupPages()
})
