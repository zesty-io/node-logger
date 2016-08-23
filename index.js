'use strict'

const types = ['DEBUG', 'INFO', 'WARN', 'ERROR']

/**
 * Wrapper for console log levels
 *
 * @param {String} msg Main message to log
 * @param {Array} data Rest of pass arguments as array
 */
types.forEach((type) => {
  module.exports[type.toLowerCase()] = function (msg, data = null) {
    const message = (msg instanceof Error) ? msg : JSON.stringify(msg)
    const epoch = Math.round(new Date().getTime() / 1000.0)
    const log = `${type} ${epoch} ${message} ${JSON.stringify(data)}`
    if (type === 'ERROR') {
      console.error(log)
    } else {
      console.log(log)
    }
  }
})
