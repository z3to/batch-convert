<template>
  <label>{{ label }}:
    <input v-model="format" spellcheck="false" />
    <section>
      Examples:
      <button v-for="option in formats" @click="updateFormat(option.value)">
        {{ option.text }}
      </button>
    </section>
  </label>
</template>

<script>
  import first from 'lodash/first'

  export default {
    props: ['label', 'formats'],
    data: function () {
      return {
        format: null
      }
    },
    methods: {
      updateFormat: function (value) {
        this.format = value
      }
    },
    watch: {
      format: function () {
        this.$emit('updateFormat', this.format)
      }
    },
    mounted () {
      this.format = first(this.formats).value
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
