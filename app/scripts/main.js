/* global page, Modernizr */
$(() => {
  'use strict'

  const appState = { }
  const $app = $('#app').parent()

  const serializeToObject = ($form) => {
    const ret = {}
    $form.serializeArray().forEach((field) => {
      if (field.value) { ret[field.name] = field.value }
    })
    return ret
  }

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
      const here = pathname(this.baseURI).slice(1)
      appState[here] = serializeToObject($(this))
      // appState[here] = $(this).serializeArray()
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
      $('#appstate').text(JSON.stringify(appState, null, ' '))
    })
  }

  const pages = [
    ['/', 'index'],
    ['/a-propos', 'à propos'],
    ['/contact', 'contact'],
    ['/premiere-visite', 'première visite'],
    ['/accueil-visiteur', 'accueil visiteur']
  ]

  const notfound = () => showPage('/404', 'not found', 'zoomInLeft')

  const pageExit = (ctx, next) => {
    console.log('PAGE exit')
    $('#app').addClass('animated rollOut') // zoomOutRight lightSpeedOut
    setTimeout(next, 500)
  }

  const setupPages = () => {
    anchorer()
    formStuff()
    pages.forEach((p) => page(p[0], showPage.bind(null, p[0], p[1])))
    page('*', notfound)
    page.exit(pageExit)
    page({
      dispatch: false,
      hashbang: !Modernizr.history
    })
  }

  setupPages()
})
