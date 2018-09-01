<template>
  <div class="flowMain">
    <div class="flow">
      <el-container>
        <el-header height="30px">
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
            <el-col :span="10">
              <div class="grid-content bg-purple">开始时间</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">{{cardInfo.startDate?cardInfo.startDate:'--'}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">{{cardInfo.type==1?"最新处理时间":"结束时间"}}</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">{{cardInfo.endDate?cardInfo.endDate:'--'}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">耗时</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">{{cardInfo.totalHours>0?cardInfo.totalHours+'&nbsp;小时':'--'}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">参与员工数</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">{{cardInfo.employees>0?cardInfo.employees:'--'}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">参与部门数</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">{{cardInfo.departments>0?cardInfo.departments:'--'}}</div>
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
            <el-aside width="280px">
              <div class="asideTitle">
                概览
              </div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">开始时间</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">{{dataPanel.begin}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">结束时间</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">{{dataPanel.end}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">总耗时</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">{{dataPanel.hours}}&nbsp;H</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">站点总数</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">{{dataPanel.totalSite}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">平均耗时</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">{{dataPanel.avgHours}}&nbsp;H</div>
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
  export default {
    props: ['screenWidth', 'workflowid', 'requestid'],
    data() {
      return {
        details: [
          {
            workflowid: 1,
            name: "公司使用(固定资产及低值易耗品)采购申请",
            parent: "",
            type: 0,
            requestinfo: ['1', '2'],
            analysisData: {
              begin: "2018-01-01 01:01:01",
              end: "2018-01-01 01:01:01",
              hours: 10,
              userTotal: 4,
              orgTotal: 2,
              reqDetails: [
                {
                  requestid: "",
                  title: "",
                  reqDate: "",
                  endDate: "",
                  reqMan: "",
                  node: "",
                  nodeids: "",
                  hours:0,
                  userTotal:0,
                  orgTotal:0,
                }
              ],
            }
          }
        ],
        cardInfo: {
          show: false,
          type: 0,
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
          begin: "",
          end: "",
          hours: 0,
          totalSite: 0,
          avgHours: 0,
        },
        timeChartData: [],
        employeeChartData: [],
        departmentChartData: [],
        aliveSite:0,
      }
    },
    methods: {
      render() {
        this.flowChart("#flowChart");
      },
      //轨道图
      flowChart(selector) {
        const d3 = this.$d3;
        const width = 960, height = 500;
        //创建svg
        this.svg = d3.select(selector).append('svg')
          .attr('width', width)
          .attr('height', height);
        this.g = this.svg.append("g")
          .attr("transform", "translate(40,0)");
        let tree = d3.tree().size([height, width - 160]);
        let stratify = d3.stratify().id(d => {
          return d.workflowid;
        }).parentId(d => {
          return d.parent;
        });
        let root = stratify(this.details).sort((a, b) => {
          return (a.height - b.height) || a.id.localeCompare(b.id);
        });
        this.g.selectAll(".link")
          .data(tree(root).links())
          .enter().append("path")
          .attr("class", "link")
          .attr("d", d3.linkHorizontal()
            .x(d => {
              return d.y + 30;
            })
            .y(d => {
              return d.x;
            }));
        let node = this.g.selectAll(".node")
          .data(root.descendants())
          .enter()
          .append("g")
          .attr("class", d => {
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
          .attr("transform", d => {
            return "translate(" + (d.y + 30) + "," + d.x + ")";
          })
          .on("click", this.handleTable)
          .on("mouseover", this.handleShowCard)
          .on("mouseout", this.handleShowCard);
        node.append("circle")
          .attr("r", 20);
        node.append("text")
          .attr("dy", 35)
          .attr("x", d => {
            if (d.data.name && d.data.name.length > 4 && d.data.parent !== "") {
              return -20 - (d.data.name.length - 4) * 5;
            } else {
              return -20;
            }
          })
          .style("text-anchor", "start")
          .text(d => {
            if (d.data.name && d.data.name.length > 10) {
              if (d.data.parent === "") {
                return d.data.name.substring(0, 10) + "...";
              } else {
                return d.data.name.substring(0, 15) + "...";
              }
            } else {
              return d.data.name;
            }
          });
      },

      //统计分析饼图：时间纬度、员工纬度、部门纬度饼图
      dataChart(selector, data) {
        const d3 = this.$d3;
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
        let pie = d3.pie().sort(null).value(d => {
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
          .attr("fill", d => {
            return color(d.data.value);
          })
          .style("cursor", "pointer")
          .each(d => {
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
          .on("click", this.handleTable);

        subg.append("text")
          .attr("transform", d => {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("dy", "0.35em")
          .text(d => {
            return d.data.value;
          });

        //文字标签
        let lines = svg.append('g').attr('class', 'lines');
        let labels = svg.append('g').attr('class', 'labels');
        labels.selectAll('text')
          .data(pie(data))
          .enter()
          .append('text')
          .attr('fill', d => {
            return color(d.data.value);
          })
          .text(d => {
            return d.data.name;
          })
          .style('text-anchor', d => {
            return (d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 'start' : 'end';
          })
          .style("font-size", "0.7em")
          .attr('transform', d => {
            // 找出外弧形的中心点
            let pos = outerArc.centroid(d);
            // 改变文字标识的x坐标
            pos[0] = outerRadius * ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1.1 : -1.1);
            return 'translate(' + pos + ')';
          })
          .style('opacity', 1);
        //连接线
        lines.selectAll('polyline')
          .data(pie(data))
          .enter()
          .append('polyline')
          .attr('class', 'chartLine')
          .attr('points', d => {
            let pos = outerArc.centroid(d);
            pos[0] = outerRadius * ((d.startAngle + (d.endAngle - d.startAngle) / 2) < Math.PI ? 1.1 : -1.1);
            return [oArc.centroid(d), outerArc.centroid(d), pos];
          })
          .style('opacity', 0.5);
      },
      handleTable(d) {
        this.$emit('workflowChange', d.data);
      },
      handleShowCard(d) {
        const d3 = this.$d3;
        this.cardInfo.top = d3.event.pageY;
        this.cardInfo.left = d3.event.pageX;
        this.cardInfo.show = !this.cardInfo.show;
        this.cardInfo.type = d.data.type;
        if (this.cardInfo.show) {
          if (d.data.type > 1) {//无数据
            this.cardInfo.startDate = "";
            this.cardInfo.endDate = "";
            this.cardInfo.totalHours = "0";
            this.cardInfo.employees = "0";
            this.cardInfo.departments = "0";
          } else {//进行中和已完成
            const index = this.details.indexOf(d.data);
            if (this.details[index].analysisData) {
              this.cardInfo.startDate = this.details[index].analysisData.begin;
              this.cardInfo.endDate = this.details[index].analysisData.end;
              this.cardInfo.totalHours = this.details[index].analysisData.hours;
              this.cardInfo.employees = this.details[index].analysisData.userTotal;
              this.cardInfo.departments = this.details[index].analysisData.orgTotal;
            } else {
              let params = new URLSearchParams();
              params.append('reqids', JSON.stringify(d.data.requestinfo));
              this.getRequestAnalysis(params, index);
            }
          }
        }
      },
      getRequestAnalysis(params, index) {
        this.axios.post('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=requestanalysis', params,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}).then(response => {
          this.details[index].analysisData = response.data;
          this.cardInfo.startDate = response.data.begin;
          this.cardInfo.endDate = response.data.end;
          this.cardInfo.totalHours = response.data.hours;
          this.cardInfo.employees = response.data.userTotal;
          this.cardInfo.departments = response.data.orgTotal;
          this.computeDataPanel(this.details[index], index);
        });
      },
      handleShowDataPanel() {
        this.dataPanel.show = !this.dataPanel.show;
        if (this.dataPanel.show && this.dataPanel.totalSite === 0) {
          this.details.forEach((data, index) => {
            if (data.type < 2) {
              if (!data.analysisData) {
                let params = new URLSearchParams();
                params.append('reqids', JSON.stringify(data.requestinfo));
                this.getRequestAnalysis(params,index);
              } else {
                this.computeDataPanel(data, index);
              }
            }
          });
        }
      },
      computeDataPanel(data, index) {
        this.dataPanel.totalSite++;
        //左侧概览计算
        let reg = new RegExp('-', 'g');
        if (index === 0) {
          this.dataPanel.begin = data.analysisData.begin;
          this.dataPanel.end = data.analysisData.end;
        }
        if (Date.parse(this.dataPanel.end.replace(reg, '/')) < Date.parse(data.analysisData.end.replace(reg, '/'))) {
          this.dataPanel.end = data.analysisData.end;
        }
        const hours = Math.round((Date.parse(this.dataPanel.end.replace(reg, '/')) - Date.parse(this.dataPanel.begin.replace(reg, '/'))) / (1000 * 60 * 60) * 100) / 100.00;
        this.dataPanel.hours = hours;
        this.dataPanel.avgHours = Math.round(hours / this.dataPanel.totalSite * 100) / 100.00;
        //饼图计算
        this.timeChartData.push({
          workflowid:data.workflowid,
          name:data.name,
          type:data.type,
          analysisData:data.analysisData,
          value:data.analysisData.hours,
        });
        this.employeeChartData.push({
          workflowid:data.workflowid,
          name:data.name,
          type:data.type,
          analysisData:data.analysisData,
          value:data.analysisData.userTotal,
        });
        this.departmentChartData.push({
          workflowid:data.workflowid,
          name:data.name,
          type:data.type,
          analysisData:data.analysisData,
          value:data.analysisData.orgTotal,
        });
        if (this.dataPanel.totalSite===this.aliveSite){
          this.dataChart("#timeChart", this.timeChartData);
          this.dataChart("#employeeChart", this.employeeChartData);
          this.dataChart("#departmentChart", this.departmentChartData);
        }
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
    },
    watch: {
      workflowid(){
        let url = "/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=showflowrelate&workflowid="
          + this.workflowid + "&requestid=" + this.requestid;
        //数据模拟
        url = "/api/flow/detail";
        this.axios.get(url).then(response => {
          this.details = response.data;
          this.flowChart("#flowChart");
          let i=0;
          for (let data of this.details){
            if (data.type<2) {
              i++;
            }
          }
          this.aliveSite = i;
        })
      },
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
    left: 40%;
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
    margin: 0 10px 30px 10px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }

  .dataPanel .asideTitle {
    text-align: center;
    margin-top: 20px;
    font-size: 1em;
    color: #776565;
  }

  .dataPanel .el-main {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    margin: 0 10px 30px 0;
    border-radius: 5px;
  }

  .dataPanel .pullDown {
    position: absolute;
    top: 0;
    left: 47%;
    cursor: pointer;
    width: 100px;
    height: 50px;
  }

  .dataPanel .pullDown > i {
    color: #3b9c81;
    font-weight: 600;
    position: absolute;
    left: 40%;
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
    margin-top: 30px;
    text-align: center;
    font-size: 1.2em;
    color: #776565;
  }

  .dataPanel .el-row {
    padding: 10px;
    margin: 10px 10px 5px 10px;
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
    font-size: 1em;
  }

  .dataPanel .chartLine {
    fill: none;
    stroke: #6b6b6b;
    stroke-width: 1px;
    stroke-dasharray: 2px;
  }

  .dataPanel .slices text {
    font-size: 0.6em;
    text-anchor: middle;
    fill: #f7f7f7;
  }
</style>
