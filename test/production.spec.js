'use strict'

let test = require('ava')
let intercept = require('intercept-stdout')
let parse = require('./helpers/parse-log')
let log = require('../index')

process.env.NODE_ENV = 'production'

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

  let data = parse(t.context.captured)

  t.is(data.type, 'INFO')
  t.is(data.message, 'log.info')
  t.is(data.data, null)
})

test('log.info data is an object', (t) => {
  log.info('log.info', {test: true})

  let data = parse(t.context.captured)

  t.is(data.data.test, true)
})

test('log.debug follows message pattern', (t) => {
  log.debug('log.debug')

  let data = parse(t.context.captured)

  t.is(data.type, 'DEBUG')
  t.is(data.message, 'log.debug')
  t.is(data.data, null)
})

test('log.warn follows message pattern', (t) => {
  log.warn('log.warn')

  let data = parse(t.context.captured)

  t.is(data.type, 'WARN')
  t.is(data.message, 'log.warn')
  t.is(data.data, null)
})

test('log.error follows message pattern', (t) => {
  log.error('log.error')

  let data = parse(t.context.captured)

  t.is(data.type, 'ERROR')
  t.is(data.message, 'log.error')
  t.is(data.data, null)
})
