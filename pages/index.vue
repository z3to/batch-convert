<template>
  <div class="page-wrapper">
    <header class="page-header">
      <a href="http://convert.zeto.io/time" rel="self"><h1>Timestamp Converter</h1></a>
      <p>Put in a list of dates separated by linebreaks. You can change the input and output format manually or select from the examples. Tokens are similar to the LDML format. A list of available tokens can be found here: http://momentjs.com/docs/#/displaying/format/</p>
    </header>
    <aside class="page-options">
      <label>Input format:
        <input v-model="iFormat" spellcheck="false" />
        <section>
          Examples:
          <button v-for="option in formatsInput" v-on:click="iFormat = option.value">
            {{ option.text }}
          </button>
        </section>
      </label>
      <label>Output format:
        <input v-model="oFormat" spellcheck="false" />
        <section>
          Examples:
          <button v-for="option in formatsOutput" v-on:click="oFormat = option.value">
            {{ option.text }}
          </button>
        </section>
      </label>
    </aside>
    <section class="page-io">
      <textarea :value="input" @input="updateInput"></textarea>
      <textarea :value="compiledList"></textarea>
    </section>
  </div>
</template>

<script>
  import { convertList } from '~/assets/scripts/utils.js'
  import debounce from 'lodash/debounce'
  import first from 'lodash/first'
  import moment from 'moment'

  const sample = '12.8.2015\n12.8.1015'

  const formatsInput = [
    { text: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
    { text: 'MM.DD.YYYY', value: 'MM.DD.YYYY' },
    { text: 'MM.DD.YY', value: 'MM.DD.YY' },
    { text: 'YYYY.MM.DD', value: 'YYYY.MM.DD' },
    { text: 'DD.MM.YYYY hh:mm:ss', value: 'DD.MM.YYYY hh:mm:ss' }
  ]

  const formatsOutput = [
    { text: 'Timestamp', value: 'X' },
    { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
    { text: 'DD-MM-YYYY', value: 'DD-MM-YYYY' },
    { text: 'DD/MM/YYYY hh:mm:ss', value: 'DD/MM/YYYY hh:mm:ss' },
    { text: 'ISO 8601', value: null }
  ]

  export default {
    data: function () {
      return {
        iFormat: first(formatsInput).value,
        oFormat: first(formatsOutput).value,
        formatsInput: formatsInput,
        formatsOutput: formatsOutput,
        input: sample
      }
    },
    computed: {
      compiledList: function () {
        const { input, iFormat, oFormat } = this

        return convertList(input, line => {
          return moment(line, iFormat).format(oFormat)
        })
      }
    },
    methods: {
      updateInput: debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .page-wrapper {
    width: calc(100vw - #{$spacing * 2});
    max-width: 1120px;
    margin: $spacing;
  }

  .page-header, input, textarea, label, button {
    border: none;
    resize: none;
    outline: none;
    box-sizing: border-box;
    display: inline-block;
  }

  input, textarea {
    font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    letter-spacing: 0.05em;
    font-size: 0.85em;
  }

  input {
    margin: 0 20px;
    padding: 5px 5px;
    border: 1px solid #ddd;
    transition: all 0.2s;
    color: #555;

    &:focus {
      border: 1px solid lighten(#e96900, 20%);
      color: #000;
    }
  }

  textarea {
    min-height: 500px;
    max-height: 80vh;
    background-color: #f8f8f8;
    padding: 20px;
  }

  h1,
  h2,
  textarea {
    font-weight: 600;
    color: #2c3e50;
  }

  section {
    padding: 10px 0;
  }

  a {
    text-decoration: none;
    color: #42b983;

    &:hover, &:focus, &:active {
      color: darken(#42b983, 10%);
    }
  }

  button {
    border: 0;
    color: #42b983;
    font-size: 0.8em;
    background-color: #fafafa;
    cursor: pointer;
    padding: 4px;
    margin: 2px;
    border-radius: 2px;

    &:hover, &:focus, &:active {
      color: darken(#42b983, 10%);
    }
  }

  p, label, button {
    word-spacing: 0.05em;
  }
</style>
