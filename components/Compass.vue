<template>
  <div class="page-compass" v-if="isActive && node">
    <section class="page-wrapper">
      <header class="page-family">
        <h3 v-html="'Parents (Linking to here)'" />
        <List :parent="parents" :hasChildren="false" :isNav="true" />
      </header>
      <article>
        <h2 v-html="currentNode" :class="node.topic" />
        <h1 v-html="node.label" :class="node.topic" />
        <p v-html="node.text" />
        <aside v-if="node.quantas.length">
          <span>Related Quanta stories</span>
          <ul>
            <li v-for="link in node.quantas"><a :href="link[0]">{{ link[1] }}</a></li>
          </ul>
        </aside>
        <footer>
          <nuxt-link to="/overview" v-html="'To overview'" class="btn" />
        </footer>
      </article>
      <footer class="page-family">
        <h3 v-html="'Children (Linking from here)'" />
        <List :parent="children" :hasChildren="false" :isNav="true" />
      </footer>
    </section>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import get from 'lodash/get'
  import includes from 'lodash/includes'
  import isUndefined from 'lodash/isUndefined'
  import filter from 'lodash/filter'
  import map from 'lodash/map'
  import compact from 'lodash/compact'
  import head from 'lodash/head'
  import List from '~/components/List.vue'

  export default {
    computed: {
      ...mapState({
        'edges': state => state.edges.edges
      }),
      ...mapGetters([
        'ids',
        'nodeList'
      ]),
      currentNode: function () {
        return get(this.$route.params, 'node', 'N0')
      },
      isActive: function () {
        return !isUndefined(this.currentNode) && includes(this.ids, this.currentNode)
      },
      node: function () {
        return get(this.nodeList, this.currentNode, undefined)
      },
      children: function () {
        return this.getFamily('source')
      },
      parents: function () {
        return this.getFamily('target')
      }
    },
    methods: {
      getFamily: function (relation) {
        return compact(map(filter(this.edges, { [relation]: this.currentNode }), edge => {
          return get(this.nodeList, edge[relation === 'target' ? 'source' : 'target'], undefined)
        }))
      },
      navigation: function ({ keyCode }) {
        let id
        if (keyCode === 27) { // Escape
          id = '/'
        } else if (keyCode === 39) { // Next node
          id = get(head(this.children), 'id', false)
        } else if (keyCode === 37) { // Previous node
          id = get(head(this.parents), 'id', false)
        }
        if (id) {
          this.$router.push(id)
        }
      }
    },
    mounted () {
      document.addEventListener('keyup', this.navigation)
    },
    destroyed () {
      document.removeEventListener('keyup', this.navigation)
    },
    components: {
      List
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .page-compass {
    display: flex;
    justify-content: center;
    min-height: 100vh;

    .page-wrapper {
      max-width: 1200px;
      width: 90vw;
    }

    .page-family {
      height: 10vh;
      margin: $spacing 0;
    }

    article {
      background-color: #fff;
      color: #222;
      padding: $spacing * 2;

      aside {
        padding-top: $spacing;
      }

      footer {
        @include center;
        padding: $spacing;
      }
    }

    h1, h2 {
      &.N {
        color: $color-numbers;
      }

      &.S {
        color: $color-shapes;
      }

      &.C {
        color: $color-changes;
      }

      &.P {
        color: $color-aside;
      }
    }
  }
</style>
