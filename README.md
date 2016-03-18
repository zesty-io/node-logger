# Node Logger

Wrapper for `console.log` and `console.error`. 

We want a consitent way to format out logs to `stdout` so the format is consistent in our log aggregation.

## Usage

Require the module

    const log = require('node-logger')

Log at different levels

    log.info('Custom message')
    log.debug('Custom message', [...])
    log.warn('Custom message', {...})
    log.error()

Each method takes 2 parameters a `msg` and `data`. Your message should be a string to log and anything passed as data is passed through `JSON.stringify`.
