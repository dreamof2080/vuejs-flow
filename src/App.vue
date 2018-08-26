<template>
  <div id="app">
    <Flow :screenWidth="screenWidth" @workflowChange="handleWorkflow"/>
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
      screenWidth:document.body.clientWidth,
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
  },
  mounted () {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    }
  }
}
</script>

<style>
  body{
    background-color: #f3f3f3;
  }
</style>
