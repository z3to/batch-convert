<template>
  <ul>
    <li
      v-for="node in parent"
      :key="node.id"
      :class="node.topic"
      :style="{ 'gridColumn': `${node.hierachy + 1} / ${node.hierachy + 2}` }">
      <nuxt-link :to="`/${node.id}`">
        <span>{{ node.id}}: <strong>{{ node.label }}</strong></span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  import get from 'lodash/get'

  export default {
    name: 'Branch',
    props: {
      parent: {},
      hasChildren: {
        type: Boolean,
        default: true
      },
      isNav: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      children: function () {
        return this.hasChildren ? get(this.parent, 'children', false) : this.parent
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  ul {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(13, 1fr);
    grid-column-gap: $spacing / 2;
    grid-row-gap: $spacing / 2;

    li {
      list-style: none;
      line-height: 1.2;
      font-size: 14px;

      strong {
        display: block;
      }
    }
  }

  li {
    &.N a {
      color: $color-numbers;
    }

    &.S a {
      color: $color-shapes;
    }

    &.C a {
      color: $color-changes;
    }

    &.P a {
      color: $color-aside;
    }
  }
</style>
