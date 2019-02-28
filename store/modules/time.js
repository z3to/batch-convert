const state = {
  sample: '12.8.2015\n12.8.1015',
  formatsInput: [
    { text: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
    { text: 'MM.DD.YYYY', value: 'MM.DD.YYYY' },
    { text: 'MM.DD.YY', value: 'MM.DD.YY' },
    { text: 'YYYY.MM.DD', value: 'YYYY.MM.DD' },
    { text: 'DD.MM.YYYY hh:mm:ss', value: 'DD.MM.YYYY hh:mm:ss' }
  ],
  formatsOutput: [
    { text: 'Timestamp', value: 'X' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { text: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
    { text: 'DD/MM/YYYY hh:mm:ss', value: 'DD/MM/YYYY hh:mm:ss' },
    { text: 'ISO 8601', value: null }
  ]
}

export default {
  state
}
