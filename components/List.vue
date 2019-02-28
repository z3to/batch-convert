<template>
  <ul v-if="children" :class="{ isNav }">
    <li
      v-for="node in children"
      :key="node.id"
      :class="node.topic">
      <nuxt-link :to="`/${node.id}`">
        <span>{{ node.id}}: <strong>{{ node.label }}</strong></span>
      </nuxt-link>
      <List :parent="node" v-if="node.children.length && hasChildren" />
    </li>
  </ul>
</template>

<script>
  import get from 'lodash/get'

  export default {
    name: 'List',
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

  .isNav {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: $spacing;

    li {
      list-style: none;
      line-height: 1.2;

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
