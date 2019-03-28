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
  import { toLower, toUpper, startCase, escape, deburr, capitalize, trim as tr } from 'lodash'

  const sample = 'Côte d’Ivoire\nLove & Peace\nthe lord of the rings\n lorem ipsum   dolor sit amet  '

  const formatsOutput = [
    { text: 'Uppercase', sample: 'CÔTE D’IVOIRE', description: 'Converts string, as a whole, to upper case just like String#toUpperCase.', value: 'up' },
    { text: 'Lowercase', sample: 'côte d’ivoire', description: 'Converts string, as a whole, to lower case just like String#toLowerCase.', value: 'low' },
    { text: 'Titlecase', sample: 'C Te D Ivoire', description: 'It converts a string to title case string.', value: 'title' },
    { text: 'Camelcase', sample: 'cTeDIvoire', description: 'It converts a string to camel case string.', value: 'camel' },
    { text: 'Kebabcase/Slugify/Classcase', sample: 'c-te-d-ivoire', description: 'It converts a string to kebab case string.', value: 'kebab' },
    { text: 'Constantcase', sample: 'C_TE_D_IVOIRE', description: 'It converts a string to constant case string.', value: 'constant' },
    { text: 'Dotcase', sample: 'c.te.d.ivoire', description: 'It converts a string to dot case string.', value: 'dot' },
    { text: 'Pascalcase', sample: 'CTeDIvoire', description: 'It converts a string to pascal case string.', value: 'pascal' },
    { text: 'Snakecase', sample: 'c_te_d_ivoire', description: 'It converts a string to snake case string.', value: 'snake' },
    { text: 'Startcase', sample: 'Cote D Ivoire', description: 'Converts string to start case.', value: 'start' },
    { text: 'SEO Title', sample: 'C te d Ivoire', description: 'Capitalize each word of str as long as word’s length is higher or equal to 3. First word is always capitalized.', value: 'seo' },
    { text: 'Trim spaces', sample: 'lorem ipsum &nbsp; dolor sit amet', description: 'Removes leading and trailing whitespace or specified characters from string.', value: 'trim' },
    { text: 'Trim and multiple spaces', sample: 'lorem ipsum dolor sit amet', description: 'It trims str and turns multiple whitespace to single whitespace.', value: 'spaces' },
    { text: 'Escape', sample: 'Love &amp;amp; Peace', description: 'Converts the characters "&", "<", ">", \'"\', and "\'" in string to their corresponding HTML entities.', value: 'escape' },
    { text: 'Deburr', sample: 'Cote d’Ivoire', description: 'Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.', value: 'deburr' },
    { text: 'Capitalize', sample: 'The lord of the rings', description: 'Converts the first character of string to upper case and the remaining to lower case.', value: 'capitalize' },
    { text: 'Double', sample: 'Côte d’Ivoire Côte d’Ivoire', description: 'Print the string twice.', value: '$value $value' }
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
