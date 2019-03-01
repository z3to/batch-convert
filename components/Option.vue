<template>
  <section>
    <h2>{{ label }}</h2>
    <ul>
      <li v-for="option in formats" @click="updateFormat(option.value)" :class="{ clickable: true, active: format === option.value }">
        <i :class="format === option.value ? 'icon-circle' : 'icon-circle-thin'" />
        <strong>{{ option.text }}</strong>
        <span>{{ option.sample }}</span>
      </li>
      <li :class="{ active: isCustom }">
        <i :class="isCustom ? 'icon-circle' : 'icon-circle-thin'" />
        <input v-model="format" spellcheck="false" />
      </li>
    </ul>
    <small>
      <slot />
    </small>
  </section>
</template>

<script>
  import first from 'lodash/first'
  import map from 'lodash/map'
  import includes from 'lodash/includes'

  export default {
    props: ['label', 'formats'],
    data: function () {
      return {
        format: null
      }
    },
    computed: {
      isCustom: function () {
        const { format, formats } = this
        return !includes(map(formats, 'value'), format)
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

  ul {
    list-style: none;
    margin-bottom: $spacing / 2;

    li {
      padding: 0;
      display: block;
      background-color: #FFFFFF;
      border-bottom: 1px solid #F1F2F6;
      font-size: 0.8rem;
      display: grid;
      grid-template-columns: 35px repeat(2, 1fr);
      width: 100%;
      padding: 10px 0;
      line-height: 1.3rem;

      span, i {
        color: #aaa;
        font-size: 0.9em;
      }

      i {
        margin-left: $spacing / 4;
      }

      &.active {
        &, & i, & span {
          color: #435CC9;
        }

        i {
          opacity: 0.8;
        }

        input {
          color: #435CC9;
          font-weight: 700;
        }
      }

      &:hover:not(.active) {
        background-color: #FBFCFE;
        color: #000;
      }

      input {
        grid-column: 2 / 4;
        padding: 10px 0;
        background-color: transparent;
        width: 100%;
        display: block;
        margin: 0;
        transition: all 0.2s;
        color: #555;
        font-size: 0.8rem;

        &:focus {
          color: #435CC9;
        }
      }

      &:last-child {
        border: 0;
        padding: 0;
        background-color: #F8F9FC;

        i {
          padding: 10px 0;
        }
      }
    }
  }

</style>
