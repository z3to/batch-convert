'use strict'

const map = require('lodash/map')
const trim = require('lodash/trim')
const compact = require('lodash/compact')

const separator = '\n'

function convertList (list, func) {
  const lines = (list || '').split(separator)

  const clean = compact(map(lines, line => {
    return trim(line)
  }))

  const datum = map(clean, func)

  return datum.join(separator)
}

export { convertList }
