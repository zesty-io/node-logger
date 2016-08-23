'use strict'

let test = require('ava')
let log = require('./index')
let intercept = require('intercept-stdout')

test.beforeEach((t) => {
  t.context.captured = ''
  t.context.unhook = intercept((txt) => {
    t.context.captured += txt
  })
})

test.afterEach.always((t) => {
  t.context.captured = ''
  t.context.unhook()
})

test('log.info follows message pattern', (t) => {
  log.info('log.info')
  t.regex(t.context.captured, /INFO\s\d+\s"log.info"/)
})

test('log.info data is an object', (t) => {
  log.info('log.info', {test: true})

  // Extract logged data
  let data = /(\{.*\})/.exec(t.context.captured)
  let json = JSON.parse(data[0])

  // Test logged object is an object
  t.is(json.test, true)

  // Should not be wrapped in an array
  // this covers the legacy case where log
  // wrapped everything in an array
  t.is(Array.isArray(json), false)
})

test('log.debug follows message pattern', (t) => {
  log.debug('log.debug')
  t.regex(t.context.captured, /DEBUG\s\d+\s"log.debug"/)
})

test('log.warn follows message pattern', (t) => {
  log.warn('log.warn')
  t.regex(t.context.captured, /WARN\s\d+\s"log.warn"/)
})

test('log.error follows message pattern', (t) => {
  log.error('log.error')
  t.regex(t.context.captured, /ERROR\s\d+\s"log.error"/)
})
