<template>
  <div class="page-wrapper">
    <header class="page-header">
      <a href="http://convert.zeto.io/time" rel="self"><h1>Timestamp Converter</h1></a>
      <p>Put in a list of dates separated by linebreaks. You can change the input and output format manually or select from the examples. Tokens are similar to the LDML format. A list of available tokens can be found here: <a href="http://momentjs.com/docs/#/displaying/format/">momentjs.com/docs/#/displaying/format</a></p>
    </header>
    <aside class="page-options">
      <Option
        label="Input format"
        :formats="formatsInput"
        v-on:updateFormat="iFormat = $event" />
      <Option
        label="Output format"
        :formats="formatsOutput"
        v-on:updateFormat="oFormat = $event" />
    </aside>
    <IO
      :compiledList="compiledList"
      :sample="sample"
      v-on:updateInput="input = $event" />
  </div>
</template>

<script>
  import IO from '~/components/IO.vue'
  import Option from '~/components/Option.vue'
  import { convertList } from '~/assets/scripts/utils.js'
  import moment from 'moment'
  import isNull from 'lodash/isNull'

  const sample = '12.08.2015\n12.08.1015'

  const formatsInput = [
    { text: 'DD.MM.YYYY', value: 'DD.MM.YYYY' },
    { text: 'MM.DD.YYYY', value: 'MM.DD.YYYY' },
    { text: 'MM.DD.YY', value: 'MM.DD.YY' },
    { text: 'YYYY.MM.DD', value: 'YYYY.MM.DD' },
    { text: 'DD.MM.YYYY hh:mm:ss', value: 'DD.MM.YYYY hh:mm:ss' }
  ]

  const formatsOutput = [
    { text: 'Unix Timestamp (Seconds)', value: 'X' },
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

        if (isNull(input) || input.length === 0 || isNull(iFormat)) {
          return []
        }

        return convertList(input, line => {
          return moment(line, iFormat).format(oFormat)
        })
      }
    },
    components: {
      IO,
      Option
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

</style>
