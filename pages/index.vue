<template>
  <div class="page-wrapper">
    <header class="page-header">
      <a href="http://convert.zeto.io/time" rel="self"><h1>Timestamp Converter</h1></a>
      <p>Put in a list of dates separated by linebreaks. You can change the input and output format manually or select from the examples. Tokens are similar to the LDML format. A list of available tokens can be found here: <a href="http://momentjs.com/docs/#/displaying/format/">momentjs.com/docs/#/displaying/format</a></p>
    </header>
    <Options
      :iFormats="formatsInput"
      :oFormats="formatsOutput"
      v-on:updateIFormat="iFormat = $event"
      v-on:updateOFormat="oFormat = $event" />
    <IO
      :compiledList="compiledList"
      :sample="sample"
      v-on:updateIFormat="input = $event" />
  </div>
</template>

<script>
  import IO from '~/components/IO.vue'
  import Options from '~/components/Options.vue'
  import { convertList } from '~/assets/scripts/utils.js'
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
        iFormat: null,
        oFormat: null,
        formatsInput,
        formatsOutput,
        input: null,
        sample
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
    components: {
      IO,
      Options
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
</style>
