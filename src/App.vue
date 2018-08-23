<template>
  <div id="app">
    <Flow/>
    <DetailTable/>
  </div>
</template>

<script>
import Flow from './components/flow.vue'
import DetailTable from './components/detailTable'

export default {
  name: 'app',
  components: {
    Flow,
    DetailTable
  }
}
</script>

<style>

</style>
