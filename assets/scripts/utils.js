'use strict'

const map = require('lodash/map')
const trim = require('lodash/trim')
const isEmpty = require('lodash/isEmpty')

const separator = '\n'
const invalid = 'Invalid input'

function convertList (list, func) {
  const lines = (list || '').split(separator)

  const clean = map(lines, line => {
    return trim(line)
  })

  const datum = map(clean, line => {
    if (isEmpty(line)) {
      return ''
    }
    try {
      return func(line)
    } catch (e) {
      return invalid
    }
  })

  return datum.join(separator)
}

export { convertList }
