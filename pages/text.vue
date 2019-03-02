<template>
  <div class="page-wrapper">
    <header class="page-header">
      <span class="back"><n-link to="/">Back to overview</n-link></span>
      <a href="http://convert.zeto.io/coordinates" rel="self"><h1>Text Format Converter</h1></a>
      <p>Put a list of words in the left textarea and copy the converted coordinates form the right textarea. You can change the format of the output format with some options.</p>
    </header>
    <aside class="page-options">
      <section>
        <h2>Input</h2>
        <p>Paste a list of string separated by linebreaks in the left textarea.</p>
      </section>
      <Option
        label="Output"
        :formats="formatsOutput"
        v-on:updateFormat="oFormat = $event">
        See <a href="https://selfrefactor.github.io/string-fn/#/">String-fn</a> and lodash’s <a href="https://lodash.com/docs/4.17.11#camelCase">String functions</a> for help. Use $value as placeholder for custom output.
      </Option>
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
  import isNull from 'lodash/isNull'

  import { titleCase, camelCase, kebabCase, constantCase, dotCase, seoTitle, trim, pascalCase, snakeCase } from 'string-fn'
  import toLower from 'lodash/toLower'
  import toUpper from 'lodash/toUpper'
  import startCase from 'lodash/startCase'
  import escape from 'lodash/escape'
  import deburr from 'lodash/deburr'
  import capitalize from 'lodash/capitalize'
  import { trim as tr } from 'lodash'

  const sample = 'Lórem ipsum dolor sit åmet\nconsetetur sadipscing elitr\nsed diam   nonumy eirmod\n tempor invidunt ut labore  '

  const formatsOutput = [
    { text: 'Uppercase', sample: 'LOREM IPSUM', value: 'up' },
    { text: 'Lowercase', sample: 'lorem ipsum', value: 'low' },
    { text: 'Titlecase', sample: 'Lorem Ipsum', value: 'title' },
    { text: 'Camelcase', sample: 'LoremIpsum', value: 'camel' },
    { text: 'Kebabcase/Slugify/Classcase', sample: 'lorem-ipsum', value: 'kebab' },
    { text: 'Constantcase', sample: 'lorem-ipsum', value: 'constant' },
    { text: 'Dotcase', sample: 'lorem-ipsum', value: 'dot' },
    { text: 'Pascalcase', sample: 'lorem-ipsum', value: 'pascal' },
    { text: 'Snakecase', sample: 'lorem-ipsum', value: 'snake' },
    { text: 'Startcase', sample: 'lorem-ipsum', value: 'start' },
    { text: 'SEO Title', sample: 'lorem-ipsum', value: 'seo' },
    { text: 'Trim spaces', sample: 'Lorem ipsum', value: 'trim' },
    { text: 'Trim and multiple spaces', sample: 'Lorem ipsum', value: 'spaces' },
    { text: 'Escape', sample: 'Lorem ipsum', value: 'escape' },
    { text: 'Deburr', sample: 'Lorem ipsum', value: 'deburr' },
    { text: 'Capitalize', sample: 'Lorem ipsum', value: 'capitalize' },
    { text: 'Double', sample: 'Lorem ipsum Lorem ipsum', value: '$value $value' }
  ]

  export default {
    data: function () {
      return {
        oFormat: null,
        formatsOutput,
        input: null,
        sample
      }
    },
    computed: {
      compiledList: function () {
        const { input, oFormat } = this

        if (isNull(input) || input.length === 0 || isNull(oFormat)) {
          return []
        }

        return convertList(input, line => {
          switch (oFormat) {
            case 'up':
              return toUpper(line)
            case 'low':
              return toLower(line)
            case 'title':
              return titleCase(line)
            case 'camel':
              return camelCase(line)
            case 'kebab':
              return kebabCase(line)
            case 'constant':
              return constantCase(line)
            case 'dot':
              return dotCase(line)
            case 'pascal':
              return pascalCase(line)
            case 'snake':
              return snakeCase(line)
            case 'start':
              return startCase(line)
            case 'seo':
              return seoTitle(line)
            case 'trim':
              return tr(line)
            case 'escape':
              return escape(line)
            case 'spaces':
              return trim(line)
            case 'deburr':
              return deburr(line)
            case 'capitalize':
              return capitalize(line)
            default:
              return oFormat.replace(/\$value/g, line)
          }
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
