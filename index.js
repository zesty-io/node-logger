'use strict'

module.exports = {
  info: logFactory('INFO'),
  debug: logFactory('DEBUG'),
  warn: logFactory('WARN'),
  error: logFactory('ERROR')
}

function logFactory(type) {
  return function (message, data = null) {
    const epoch = Math.round(new Date().getTime() / 1000.0)
    let log = {type, message, epoch, data}

    if (process.env.NODE_ENV === 'production') {
      log = JSON.stringify(log)
    }

    if (type === 'ERROR') {
      console.error(log)
    } else {
      console.log(log)
    }
  }
}
