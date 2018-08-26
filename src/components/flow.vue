<template>
  <div class="flowMain">
    <div class="flow">
      <el-container>
        <el-header>
          <ul>
            <li><i>已完成</i></li>
            <li><i>进行中</i></li>
            <li><i>无关联</i></li>
          </ul>
        </el-header>
        <el-main>
          <div class="flowChart" id="flowChart"></div>
        </el-main>
      </el-container>
      <div>
        <i class="el-icon-arrow-up" v-on:click="handleShowDataPanel"></i>
      </div>

      <transition name="el-zoom-in-top">
        <el-card shadow="always" class="cardInfo" v-show="cardInfo.show" :body-style="{ padding: '10px' }" v-bind:style="{top:getCardTop,left:getCardLeft}">
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">开始时间</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{cardInfo.startDate}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">结束时间</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{cardInfo.endDate}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">耗时</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{cardInfo.totalHours}}H</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">参与员工数</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{cardInfo.employees}}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">参与部门数</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple">{{cardInfo.departments}}</div></el-col>
          </el-row>
        </el-card>
      </transition>
    </div>

    <transition name="el-zoom-in-bottom">
      <div class="dataPanel" v-show="dataPanel.show">
        <el-container>
          <el-header>统计信息</el-header>
          <el-container>
            <el-aside width="350px">
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">开始时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">2018-01-01 08:00:00</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">结束时间</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">2018-01-01 08:00:00</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">总耗时</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">48H</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">站点总数</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">10</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">平均耗时</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">4.8H</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">员工总数</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">30</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">部门总数</div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple">6</div></el-col>
              </el-row>
            </el-aside>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
      </div>
    </transition>

  </div>

</template>

<script>
  import * as d3 from 'd3'

  export default {
    props: ['screenWidth'],
    data() {
      return {
        details: [
          {workflowid: 1, name: "采购申请", parent: "", type: 0},
          {workflowid: 2, name: "采购评审", parent: "采购申请", type: 0},
          {workflowid: 3, name: "采购评审调整", parent: "采购评审", type: 2},
          {workflowid: 4, name: "银行预付款", parent: "采购评审", type: 0},
          {workflowid: 5, name: "采购到货", parent: "采购评审", type: 0},
          {workflowid: 6, name: "物资入库", parent: "采购到货", type: 1},
          {workflowid: 7, name: "采购报销付款", parent: "物资入库", type: 2},
          {workflowid: 8, name: "物资出库", parent: "物资入库", type: 2}
        ],
        cardInfo:{
          show:false,
          top:0,
          left:0,
          startDate:null,
          endDate:null,
          totalHours:null,
          employees:null,
          departments:null,
        },
        dataPanel:{
          show:false,
        }
      }
    },
    mounted() {
      this.render()
    },
    methods: {
      render() {
        const config = {
          width: 960,
          height: 500
        };
        this.constructor('#flowChart', config);
        this.drawCharts();
      },
      defaultSetting() {
        return {
          width: 600,
          height: 540
        }
      },
      constructor(selector, option) {
        const defaultSetting = this.defaultSetting();
        this.config = Object.assign(defaultSetting, option);
        const {
          width,
          height
        } = this.config;
        //创建svg
        this.svg = d3.select(selector).append('svg')
          .attr('width', width)
          .attr('height', height);
        this.g = this.svg.append("g")
          .attr("transform", "translate(40,0)");
      },
      drawCharts() {
        const {
          width,
          height
        } = this.config;
        let tree = d3.tree().size([height, width - 160]);
        let stratify = d3.stratify().id(function (d) {
          return d.name;
        }).parentId(function (d) {
          return d.parent;
        });
        let root = stratify(this.details).sort(function (a, b) {
          return (a.height - b.height) || a.id.localeCompare(b.id);
        });
        this.g.selectAll(".link")
          .data(tree(root).links())
          .enter().append("path")
          .attr("class", "link")
          .attr("d", d3.linkHorizontal()
            .x(function (d) {
              return d.y + 30;
            })
            .y(function (d) {
              return d.x;
            }));
        let node = this.g.selectAll(".node")
          .data(root.descendants())
          .enter()
          .append("g")
          .attr("class", function (d) {
            if (d.data.type > 0) {
              if (d.data.type > 1) {
                return "node node--noData";
              } else {
                return "node node--doing";
              }
            } else {
              return "node node--end";
            }
          })
          .attr("transform", function (d) {
            return "translate(" + (d.y + 30) + "," + d.x + ")";
          })
          .on("click", this.handleState)
          .on("mouseover",this.handleShowCard)
          .on("mouseout",this.handleShowCard);
        node.append("circle")
          .attr("r", 20);
        node.append("text")
          .attr("dy", 35)
          .attr("x", -20)
          .style("text-anchor", "start")
          .text(function (d) {
            return d.id.substring(d.id.lastIndexOf(".") + 1);
          });
      },
      handleState(d) {
        this.$emit('workflowChange', d.data);
      },
      handleShowCard(d){
        this.cardInfo.top = d3.event.pageY;
        this.cardInfo.left = d3.event.pageX;
        this.cardInfo.show = !this.cardInfo.show;
        if (this.cardInfo.show) {
          if (d.data.type>1){
            this.cardInfo.startDate = "无";
            this.cardInfo.endDate = "无";
            this.cardInfo.totalHours = "0";
            this.cardInfo.employees = "0";
            this.cardInfo.departments = "0";
          }else{
            this.cardInfo.startDate = "2018-10-01 08:00:00";
            this.cardInfo.endDate = "2018-10-02 08:00:00";
            this.cardInfo.totalHours = "24";
            this.cardInfo.employees = "10";
            this.cardInfo.departments = "2";
          }
        }
      },
      handleShowDataPanel(){
        this.dataPanel.show = true;
      },
    },
    computed:{
      getCardTop(){
        return this.cardInfo.top + 20 + "px";
      },
      getCardLeft(){
        let left = this.screenWidth * 0.95;
        if (this.cardInfo.left+240+50>left){
          return this.cardInfo.left - 240 - 40 + "px";
        }
        return this.cardInfo.left + 40 + "px";
      }
    }
  }
</script>


<style>
  .flowMain{
    position: relative;
  }

  .flow{
    width:90%;
    height: 70vh;
    overflow-y: auto;
    margin:0 auto;
    border-radius: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }

  .flow ul {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .flow li {
    list-style: none;
    margin-right: 20px;
    display: inline;
  }

  .flow li i {
    font-size: 0.9em;
    font-style: normal;
    color:#828990;
  }

  .flow li i:before {
    display: inline-block;
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #ff4a3b;
    margin-right: 4px;
    position: relative;
    top: 4px;
  }

  .flow li:first-child > i:before {
    background-color: #ccab76;
  }

  .flow li:last-child > i:before {
    background-color: #becfd9;
  }

  .flow .flowChart {
    text-align: center;
  }

  .flow .flowChart .node {
    cursor: pointer;
  }

  .flow .flowChart .node circle {
    fill: #999;
  }

  .flow .flowChart .node--end circle {
    fill: #ccab76;
  }

  .flow .flowChart .node--noData circle {
    fill: #becfd9;
  }

  .flow .flowChart .node--doing circle {
    stroke-width: 2px;
    fill: #ff4a3b;
    animation: bounce 3s infinite;
  }

  @keyframes bounce {
    0% {
      stroke: #d2d391;
      stroke-width: 0;
      fill: #c55a19;
      transform: scale(0.6);
    }
    50% {
      stroke: #faffaf;
      stroke-width: 0.2em;
      fill: #ff4a3b;
      transform: scale(1.2);
    }
    to {
      stroke: #d2d391;
      stroke-width: 0;
      fill: #c55a19;
      transform: scale(0.6);
    }
  }

  .flow .flowChart .node text {
    font: 0.7em sans-serif;
    fill: #868788;
  }

  /*.flow .flowChart .node--internal text {*/
  /*text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;*/
  /*}*/

  .flow .flowChart .link {
    fill: none;
    stroke: #d8e6d6;
    stroke-opacity: 0.8;
    stroke-width: 0.4em;
  }

  .flow .cardInfo{
    width:240px;
    height:140px;
    position: absolute;
    font: 0.7em sans-serif;
    background-color:#efefef;
    color:#b57474;
    z-index: 10;
  }

  .flow .cardInfo .el-row {
    margin-bottom: 10px;
  }
  
  .flow .cardInfo .el-row:last-child {
    margin-bottom: 0;
  }

  .dataPanel{
    background-color: #6e6e6e;
    position: absolute;
    top:0;
    left:5%;
    height: 70vh;
    width:90%;
    margin:0 auto;
    border-radius: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    z-index: 200;
  }
</style>
