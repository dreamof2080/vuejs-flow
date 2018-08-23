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
  .node circle {
    fill: #999;
  }

  .node text {
    font: 10px sans-serif;
  }

  .node--internal circle {
    fill: #555;
  }

  .node--internal text {
    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
  }

  .link {
    fill: none;
    stroke: #555;
    stroke-opacity: 0.4;
    stroke-width: 1.5px;
  }
</style>
