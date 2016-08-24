'use strict'

module.exports = function parseLog(log) {
  let data = /(\{.*\})/.exec(log)
  let json = JSON.parse(data[0])

  return json
}
