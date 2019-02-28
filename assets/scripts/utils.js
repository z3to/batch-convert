'use strict'

const map = require('lodash/map')

const separator = '\n'

function convertList (list, func) {
  const lines = (list || '').split(separator)

  const datum = map(lines, func)

  return datum.join(separator)
}

export { convertList }
