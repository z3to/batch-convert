<template>
  <aside class="page-options">
    <label>Input format:
      <input v-model="iFormat" spellcheck="false" />
      <section>
        Examples:
        <button v-for="option in iFormats" @click="updateIFormat(option.value)">
          {{ option.text }}
        </button>
      </section>
    </label>
    <label>Output format:
      <input v-model="oFormat" spellcheck="false" />
      <section>
        Examples:
        <button v-for="option in oFormats" @click="updateOFormat(option.value)">
          {{ option.text }}
        </button>
      </section>
    </label>
  </aside>
</template>

<script>
  import first from 'lodash/first'

  export default {
    props: ['iFormats', 'oFormats'],
    data: function () {
      return {
        iFormat: null,
        oFormat: null
      }
    },
    methods: {
      updateIFormat: function (value) {
        this.iFormat = value
        this.$emit('updateIFormat', value)
      },
      updateOFormat: function (value) {
        this.oFormat = value
        this.$emit('updateOFormat', value)
      }
    },
    created () {
      this.iFormat = first(this.iFormats).value
      this.oFormat = first(this.oFormats).value
      this.$emit('updateOFormat', this.iFormat)
      this.$emit('updateIFormat', this.oFormat)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

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

</style>
