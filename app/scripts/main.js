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
      ev.preventDefault()
      appState[pathname(this.baseURI).slice(1)] = serializeToObject($(this))
      page(pathname(this.action || this.baseURI))
    })
  }

  const setupPages = (pages) => {
    const showPage = (path, name, effect) => {
      $app.load(path + ' #app', () => {
        $('#appstate').text(JSON.stringify(appState, null, ' '))
        $('#app').addClass('animated ' + effect)
        anchorer()
        formStuff()
      })
    }
    const notfound = showPage.bind(null, '/404', 'not found', 'zoomInLeft')
    const pageExit = (ctx, next) => {
      $('#app').addClass('animated rollOut') // zoomOutRight lightSpeedOut
      setTimeout(next, 200) // next()
    }
    anchorer()
    formStuff()
    pages.forEach((p) => page(p[0], showPage.bind(null, p[0], p[1], 'rollIn')))
    page('*', notfound)
    page.exit(pageExit)
    page({
      dispatch: false,
      hashbang: !Modernizr.history
    })
  }

  setupPages([
    ['/', 'index'],
    ['/a-propos', 'à propos'],
    ['/contact', 'contact'],
    ['/premiere-visite', 'première visite'],
    ['/accueil-visiteur', 'accueil visiteur']
  ])
})
