'use strict'

module.exports = {
  info: logFactory('INFO'),
  debug: logFactory('DEBUG'),
  warn: logFactory('WARN'),
  error: logFactory('ERROR')
}

function logFactory(type) {
  return function (message, data = null) {
    const epoch = new Date().getTime()
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
