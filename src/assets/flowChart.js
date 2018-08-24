import * as d3 from 'd3'

export default class FlowChart {
  defaultSetting() {
    return {
      width: 600,
      height: 540
    }
  }

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
  }

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

    let root = stratify(this.data()).sort(function (a, b) {
      return (a.height - b.height) || a.id.localeCompare(b.id);
    });

    this.g.selectAll(".link")
      .data(tree(root).links())
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
        .x(function (d) {
          return d.y+30;
        })
        .y(function (d) {
          return d.x;
        }));

    let node = this.g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", function (d) {
        if (d.data.type>0) {
          if (d.data.type>1){
            return "node node--noData";
          }  else {
            return "node node--doing";
          }
        }else{
          return "node node--end";
        }
        // return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d) {
        return "translate(" + (d.y+30) + "," + d.x + ")";
      });

    node.append("circle")
      .attr("r", 20);

    node.append("text")
      .attr("dy", 35)
      .attr("x", -20)
      .style("text-anchor", "start")
      .text(function (d) {
        return d.id.substring(d.id.lastIndexOf(".") + 1);
      });
  }

//type解释： 0:已完成，1:进行中，2:未涉及
  data() {
    return [
      {id:1,name: "采购申请", parent: "", type:0},
      {id:2,name: "采购评审", parent: "采购申请", type:0},
      {id:3,name: "采购评审调整", parent: "采购评审", type:2},
      {id:4,name: "银行预付款", parent: "采购评审", type:0},
      {id:5,name: "采购到货", parent: "采购评审", type:0},
      {id:6,name: "物资入库", parent: "采购到货", type:1},
      {id:7,name: "采购报销付款", parent: "物资入库", type:2},
      {id:8,name: "物资出库", parent: "物资入库", type:2}
    ];
  }
}
