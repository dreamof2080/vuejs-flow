<template>
  <div class="flow">
    <div class="flowChart" id="flowChart"></div>
  </div>
</template>

<script>
  import FlowChart from '../assets/flowChart'

  export default {
    mounted(){
      this.render()
    },
    methods: {
      render() {
        const config = {
          width: 960,
          height: 500
        };
        const chart = new FlowChart('#flowChart',config);
        chart.drawCharts()
      }
    }
  }
</script>


<style>
  .flow .flowChart{
    text-align: center;
  }
  .flow .flowChart .node circle {
    fill: #999;
  }

  .flow .flowChart .node--internal circle {
    fill: #555;
  }

  .flow .flowChart .node--end circle {
    fill: #555;
  }

  .flow .flowChart .node--noData circle {
    fill: #289f2c;
  }

  .flow .flowChart .node--doing circle {
    fill: #211a89;
  }

  .flow .flowChart .node text {
    font: 0.7em sans-serif;
  }

  /*.flow .flowChart .node--internal text {*/
    /*text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;*/
  /*}*/

  .flow .flowChart .link {
    fill: none;
    stroke: #555;
    stroke-opacity: 0.4;
    stroke-width: 1.5px;
  }
</style>
