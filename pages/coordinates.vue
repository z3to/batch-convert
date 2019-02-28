<template>
  <div class="page-wrapper">
    <header class="page-header">
      <a href="http://convert.zeto.io/coordinates" rel="self"><h1>Geographic Coordinate Converter</h1></a>
      <p>Put a list of geographic coordinates separated by linebreaks in the left textarea and copy the converted coordinates form the right textarea. You can change the format of the output format with some options.</p>
    </header>
    <Options
      :iFormats="formatsInput"
      :oFormats="formatsOutput"
      v-on:updateIFormat="iFormat = $event"
      v-on:updateOFormat="oFormat = $event" />
    <IO
      :compiledList="compiledList"
      :sample="sample"
      v-on:updateInput="input = $event" />
  </div>
</template>

<script>
  import IO from '~/components/IO.vue'
  import Options from '~/components/Options.vue'
  import { convertList } from '~/assets/scripts/utils.js'
  import parseDMS from 'parse-dms'
  import formatcoords from 'formatcoords'
  import isNull from 'lodash/isNull'

  const sample = 'N51° 30\' 0.5486" W0° 7\' 34.4503"\n51°30\'0.5486" -0°7\'34.4503"\n0°7\'34.4503"W 51°30\'0.5486"N\n51:30:0.5486N 0:7:34.4503W\nN51° 30\' 0.5486\'\' W0° 7\' 34.4503\'\'\nN51° 30.009143333333\' W0° 7.574171666666667\'\n51.500152388888885,-0.12623619444444445\n51.500152388888885 -0.12623619444444445'

  const formatsInput = [
    { text: '-36.01011 -2.34856', value: 'fromDecimalArray' },
    { text: '36º 00.607\' S 002º 20.914\' W', value: 'fromDecimalString' },
    { text: '36º 00\' 36.4\'\' S 002º 20\' 54.8\'\' W', value: 'fromDegreeMinutesSeconds' },
    { text: '36º 00.607\' S 002º 20.914\' W', value: 'fromDegreeMinutes' }
  ]

  const formatsOutput = [
    { text: '27° 43′ 31.796″ N 18° 1′ 27.484″ W (DMS – degrees minutes seconds)', value: 'FFf' },
    { text: '27° 43.529933333333′ N -18° 1.4580666666667′ W (degrees decimal minutes)', value: 'Ff' },
    { text: '27.725499° N 18.024301° W (decimal degrees)', value: 'f' },
    { text: '27.725499 18.024301 (decimal degrees)', value: 'd' }
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

        if (isNull(input) || input.length === 0 || isNull(iFormat) || isNull(oFormat)) {
          return []
        }

        console.log(oFormat)

        return convertList(input, line => {
          const coords = parseDMS(line)
          return formatcoords([coords.lat, coords.lon]).format(oFormat)
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
