<template>
  <div class="flowMain">
    <div class="flow">
      <el-container>
        <el-header height="40px">
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
      <div class="pullUp" v-on:click="handleShowDataPanel">
        <i class="el-icon-arrow-up"></i>
      </div>

      <transition name="el-zoom-in-top">
        <el-card shadow="always" class="cardInfo" v-show="cardInfo.show" :body-style="{ padding: '10px' }"
                 v-bind:style="{top:getCardTop,left:getCardLeft}">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">开始时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{cardInfo.startDate}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">结束时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{cardInfo.endDate}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">耗时</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{cardInfo.totalHours}}H</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">参与员工数</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{cardInfo.employees}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">参与部门数</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{cardInfo.departments}}</div>
            </el-col>
          </el-row>
        </el-card>
      </transition>
    </div>

    <transition name="el-zoom-in-bottom">
      <div class="dataPanel" v-show="dataPanel.show">
        <el-container>
          <el-header height="15%">
            <div class="pullDown" v-on:click="handleShowDataPanel">
              <i class="el-icon-arrow-down"></i>
            </div>
            <div class="dataTitle">
              统计信息
            </div>
          </el-header>
          <el-container>
            <el-aside width="300px">
              <div class="asideTitle">
                概览
              </div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">开始时间</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">2018-01-01 08:00:00</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">结束时间</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">2018-01-01 08:00:00</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">总耗时</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">48H</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">站点总数</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">10</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">平均耗时</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">4.8H</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">员工总数</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">30</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">部门总数</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">6</div>
                </el-col>
              </el-row>
            </el-aside>
            <el-main>
              <div class="dataChart">
                <div class="timeChart" id="timeChart">
                  <div>时间纬度</div>
                </div>
                <div class="employeeChart" id="employeeChart">
                  <div>员工纬度</div>
                </div>
                <div class="departmentChart" id="departmentChart">
                  <div>部门纬度</div>
                </div>
              </div>
            </el-main>
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
        cardInfo: {
          show: false,
          top: 0,
          left: 0,
          startDate: null,
          endDate: null,
          totalHours: null,
          employees: null,
          departments: null,
        },
        dataPanel: {
          show: false,
        },
        timeChartData: [
          {workflowid:1,name:"采购申请",type:0,value:2},
          {workflowid:2,name:"采购评审",type:0,value:4},
          {workflowid:3,name:"采购评审调整",type:2,value:1},
          {workflowid:4,name:"银行预付款",type:0,value:9},
          {workflowid:5,name:"采购到货",type:0,value:2},
          {workflowid:6,name:"物资入库",type:1,value:7}
        ],
        employeeChartData: [
          {workflowid:1,name:"采购申请",type:0,value:10},
          {workflowid:2,name:"采购评审",type:0,value:14},
          {workflowid:3,name:"采购评审调整",type:2,value:6},
          {workflowid:4,name:"银行预付款",type:0,value:8},
          {workflowid:5,name:"采购到货",type:0,value:11},
          {workflowid:6,name:"物资入库",type:1,value:7}
        ],
        departmentChartData: [
          {workflowid:1,name:"采购申请",type:0,value:2},
          {workflowid:2,name:"采购评审",type:0,value:4},
          {workflowid:3,name:"采购评审调整",type:2,value:1},
          {workflowid:4,name:"银行预付款",type:0,value:3},
          {workflowid:5,name:"采购到货",type:0,value:2},
          {workflowid:6,name:"物资入库",type:1,value:5}
        ],
      }
    },
    mounted() {
      this.render()
    },
    methods: {
      render() {
        this.constructor('#flowChart');
        this.flowChart();
        this.dataChart("#timeChart", this.timeChartData);
        this.dataChart("#employeeChart", this.employeeChartData);
        this.dataChart("#departmentChart", this.departmentChartData);
      },
      constructor(selector) {
        this.config = {
          width: 960,
          height: 500
        };
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
      //轨道图
      flowChart() {
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
          .on("mouseover", this.handleShowCard)
          .on("mouseout", this.handleShowCard);
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

      //统计分析饼图：时间纬度、员工纬度、部门纬度饼图
      dataChart(selector, data) {
        const color = d3.scaleOrdinal([
          '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
          '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
          '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
          '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
        ]);
        const width = 400;
        const height = 400;
        const outerRadius = height / 3 - 30,
          innerRadius = outerRadius / 4;
        let pie = d3.pie().sort(null).value(function (d) {
          return d.value;
        });
        let arc = d3.arc()
          .padRadius(outerRadius)
          .innerRadius(innerRadius);
        let outerArc = d3.arc()
          .innerRadius(1.1 * outerRadius)
          .outerRadius(1.1 * outerRadius);
        let oArc = d3.arc()
          .innerRadius(outerRadius)
          .outerRadius(outerRadius);
        let svg = d3.select(selector).append("svg")
          .attr("width", width)
          .attr("height", height)
          .classed('main', true)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        //饼图
        let slices = svg.append('g').attr('class', 'slices');
        let subg = slices.selectAll('g')
          .data(pie(data))
          .enter().append("g");
        subg.append("path")
          .attr("fill",function (d) {
            return color(d.data.value);
          })
          .style("cursor","pointer")
          .each(function (d) {
            d.outerRadius = outerRadius - 20;
          })
          .attr("d", arc)
          .on("mouseover", function () {
            d3.select(this).transition().delay(0).attrTween("d", function (d) {
              let i = d3.interpolate(d.outerRadius, outerRadius);
              return function (t) {
                d.outerRadius = i(t);
                return arc(d);
              };
            });
          })
          .on("mouseout", function () {
            d3.select(this).transition().delay(150).attrTween("d", function (d) {
              let i = d3.interpolate(d.outerRadius, outerRadius - 20);
              return function (t) {
                d.outerRadius = i(t);
                return arc(d);
              };
            });
          })
          .on("click",this.handleState);

        subg.append("text")
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.value; });

        //文字标签
        let lines = svg.append('g').attr('class', 'lines');
        let labels = svg.append('g').attr('class', 'labels');
        labels.selectAll('text')
          .data(pie(data))
          .enter()
          .append('text')
          .attr('fill', function(d) {
            return color(d.data.value);
          })
          .text(function(d) {
            return d.data.name;
          })
          .style('text-anchor', function(d) {
            return (d.startAngle + (d.endAngle - d.startAngle)/2) <Math.PI ? 'start' : 'end';
          })
          .style("font-size","0.7em")
          .attr('transform', function(d) {
            // 找出外弧形的中心点
            let pos = outerArc.centroid(d);
            // 改变文字标识的x坐标
            pos[0] = outerRadius * ((d.startAngle + (d.endAngle - d.startAngle)/2)<Math.PI ? 1.1 : -1.1);
            return 'translate(' + pos + ')';
          })
          .style('opacity', 1);
        //连接线
        lines.selectAll('polyline')
          .data(pie(data))
          .enter()
          .append('polyline')
          .attr('class','chartLine')
          .attr('points', function(d) {
            let pos = outerArc.centroid(d);
            pos[0] = outerRadius * ((d.startAngle + (d.endAngle - d.startAngle)/2)<Math.PI ? 1.1 : -1.1);
            return [oArc.centroid(d), outerArc.centroid(d), pos];
          })
          .style('opacity', 0.5);
      },
      handleState(d) {
        this.$emit('workflowChange', d.data);
      },
      handleShowCard(d) {
        this.cardInfo.top = d3.event.pageY;
        this.cardInfo.left = d3.event.pageX;
        this.cardInfo.show = !this.cardInfo.show;
        if (this.cardInfo.show) {
          if (d.data.type > 1) {
            this.cardInfo.startDate = "无";
            this.cardInfo.endDate = "无";
            this.cardInfo.totalHours = "0";
            this.cardInfo.employees = "0";
            this.cardInfo.departments = "0";
          } else {
            this.cardInfo.startDate = "2018-10-01 08:00:00";
            this.cardInfo.endDate = "2018-10-02 08:00:00";
            this.cardInfo.totalHours = "24";
            this.cardInfo.employees = "10";
            this.cardInfo.departments = "2";
          }
        }
      },
      handleShowDataPanel() {
        this.dataPanel.show = !this.dataPanel.show;
      },

    },
    computed: {
      getCardTop() {
        return this.cardInfo.top + 20 + "px";
      },
      getCardLeft() {
        let left = this.screenWidth * 0.95;
        if (this.cardInfo.left + 240 + 50 > left) {
          return this.cardInfo.left - 240 - 40 + "px";
        }
        return this.cardInfo.left + 40 + "px";
      }
    }
  }
</script>


<style>
  .flowMain {
    position: relative;
  }

  .flow {
    width: 90%;
    height: 70vh;
    overflow-y: auto;
    margin: 0 auto;
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
    color: #828990;
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

  .flow .flowChart .link {
    fill: none;
    stroke: #d8e6d6;
    stroke-opacity: 0.8;
    stroke-width: 0.4em;
  }

  .flow .cardInfo {
    width: 240px;
    height: 140px;
    position: absolute;
    font: 0.7em sans-serif;
    background-color: #efefef;
    color: #b57474;
    z-index: 10;
  }

  .flow .cardInfo .el-row {
    margin-bottom: 10px;
  }

  .flow .cardInfo .el-row:last-child {
    margin-bottom: 0;
  }

  .flow .pullUp {
    position: absolute;
    bottom: 0;
    left: 47%;
    cursor: pointer;
    width: 100px;
    height: 100px;
  }

  .flow .pullUp > i {
    color: #3b9c81;
    font-weight: 600;
    position: absolute;
    left:40%;
    bottom: 0;
    animation: pullupicon 3s infinite;
  }

  @keyframes pullupicon {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(2) translateY(-10px);
    }
  }

  .dataPanel {
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 5%;
    height: 70vh;
    width: 90%;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    z-index: 200;
  }

  .dataPanel .el-container {
    height: 100%;
  }

  .dataPanel .el-aside {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    margin: 0 20px 30px 30px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .dataPanel .asideTitle{
    text-align: center;
    margin:50px 0 20px 0;
    font-size:1.2em;
    color:#776565;
  }

  .dataPanel .el-main {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    margin: 0 20px 30px 0;
    border-radius: 5px;
  }

  .dataPanel .pullDown {
    position: absolute;
    top: 0;
    left: 47%;
    cursor: pointer;
    width:100px;
    height:50px;
  }

  .dataPanel .pullDown > i {
    color: #3b9c81;
    font-weight: 600;
    position: absolute;
    left:40%;
    top: 0;
    animation: pulldownicon 3s infinite;
  }

  @keyframes pulldownicon {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(2) translateY(10px);
    }
  }

  .dataPanel .dataTitle {
    margin-top: 50px;
    text-align: center;
    font-size: 1.5em;
    color: #776565;
  }

  .dataPanel .el-row {
    padding: 10px;
    margin: 10px;
    font-size: 0.9em;
    color: #776565;
    border-bottom: 1px dotted #f3f2f2;
  }

  .dataPanel .dataChart {
    display: -webkit-flex;
    display: flex;
    justify-content: space-around;
  }

  .dataPanel .dataChart > div {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }

  .dataPanel .dataChart > div > div {
    text-align: center;
    color: #776565;
    font-size: 1.2em;
  }

  .dataPanel .chartLine{
    fill: none;
    stroke: #6b6b6b;
    stroke-width: 1px;
    stroke-dasharray: 2px;
  }

  .dataPanel .slices text{
    font-size: 0.6em;
    text-anchor: middle;
    fill:#f7f7f7;
  }
</style>
