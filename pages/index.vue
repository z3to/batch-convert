<template>
  <div class="page-wrapper">
    <header class="page-header">
      <h1>Batch converter</h1>
      <p>Below is a list of simple copy and paste converter. Everything is done in the frontend. No tracking. You can find the source code on <a href="https://github.com/z3to/batch-convert">Github</a>. It’s part of the <a href="http://zeto.io">data wrangling collection</a> I build over the last years.</p>
    </header>
    <nav class="page-nav">
      <ul>
        <li>
          <n-link to="/timestamp">
            <h2>Timestamp Converter</h2>
            <p>Batch convert a list of timestamps in various formats into custom formatted strings.</p>
          </n-link>
        </li>
        <li>
          <n-link to="/coordinates">
            <h2>Geographic Coordinate Converter</h2>
            <p>Batch convert a list of geographic coordinates like DMS or DD into custom formatted strings.</p>
          </n-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  ul {
    list-style: none;

    li {
      margin-bottom: $spacing;
    }
  }

</style>
