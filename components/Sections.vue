<template>
  <div>
    <Section :parent="nodeList" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Section from '~/components/Section.vue'

  export default {
    computed: {
      ...mapGetters([
        'professional'
      ])
    },
    components: {
      Section
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

</style>
