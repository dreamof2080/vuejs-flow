export default {
  state:{
    workflowid:null,
    requestid:null
  },
  mutations:{
    setWorkflowId(state,stark){
      if (stark.workflowid){
        state.workflowid = stark.workflowid;
      }
      if(stark.requestid){
        state.requestid = stark.requestid;
      }
    }
  }
}
