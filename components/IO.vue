<template>
  <section class="page-io">
    <textarea :value="input" @input="updateInput"></textarea>
    <textarea :value="compiledList"></textarea>
  </section>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    props: ['compiledList', 'sample'],
    data: function () {
      return {
        input: null
      }
    },
    methods: {
      updateInput: debounce(function (e) {
        this.input = e.target.value
        this.$emit('updateInput', e.target.value)
      }, 300)
    },
    created () {
      this.input = this.sample
      this.$emit('updateInput', this.sample)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  textarea {
    min-height: 500px;
    max-height: 80vh;
    background-color: #F8F9FC;
    padding: 20px;
  }

</style>
