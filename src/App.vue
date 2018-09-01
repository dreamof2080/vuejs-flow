<template>
  <div id="app">
    <Flow :screenWidth="screenWidth" :workflowid = "workflowid" :requestid="requestid" @workflowChange="handleWorkflow"/>
    <DetailTable :workflowData = "workflowData"/>
  </div>
</template>

<script>
import Flow from './components/flow'
import DetailTable from './components/detailTable'

export default {
  name: 'app',
  data(){
    return {
      screenWidth:document.body.clientWidth,
      workflowData:null,
      requestid:null,
      workflowid:null,
    }
  },
  components: {
    Flow,
    DetailTable
  },
  methods:{
    handleWorkflow(data){
      this.workflowData = data;
    },
    loaded(){
      let url = window.location.href;
      let paramArr = url.substring(url.lastIndexOf('?') + 1,url.length).split('&');
      for (let i=0;i<paramArr.length;i++){
        let param = paramArr[i].split("=");
        if (param.length>1){
          if (param[0].toLocaleLowerCase()=='workflowid') {
            this.workflowid = param[1];
            this.$store.commit('setWorkflowId',{workflowid:param[1]});
          }
          if (param[0].toLocaleLowerCase()=='requestid') {
            this.requestid = param[1];
            this.$store.commit('setWorkflowId',{requestid:param[1]});
          }
        }
      }
    }
  },
  mounted () {
    this.loaded();
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
