<template>
  <div id="app">
    <Flow @workflowChange="handleWorkflow"/>
    <DetailTable :workflowData = "workflowData"/>
  </div>
</template>

<script>
import Flow from './components/flow.vue'
import DetailTable from './components/detailTable'

export default {
  name: 'app',
  data(){
    return {
      workflowData:null
    }
  },
  components: {
    Flow,
    DetailTable
  },
  methods:{
    handleWorkflow(data){
      this.workflowData = data;
    }
  }
}
</script>

<style>
  body{
    background-color: #f3f3f3;
  }
</style>
