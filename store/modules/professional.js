import groupBy from 'lodash/groupBy'
const professional = require('../../data/professional.json')

const state = {
  professional
}

const getters = {
  professional: state => {
    return groupBy(state.nodes, 'type')
  }
}

export default {
  state,
  getters
}
