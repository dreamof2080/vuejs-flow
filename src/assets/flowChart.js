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
          return d.y;
        })
        .y(function (d) {
          return d.x;
        }));

    let node = this.g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", function (d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    node.append("circle")
      .attr("r", 5);

    node.append("text")
      .attr("dy", 3)
      .attr("x", function (d) {
        return d.children ? -8 : 8;
      })
      .style("text-anchor", function (d) {
        return d.children ? "end" : "start";
      })
      .text(function (d) {
        return d.id.substring(d.id.lastIndexOf(".") + 1);
      });
  }


  data() {
    return [
      {name: "Eve", parent: ""},
      {name: "Cain", parent: "Eve"},
      {name: "Seth", parent: "Eve"},
      {name: "Enos", parent: "Seth"},
      {name: "Noam", parent: "Seth"},
      {name: "Abel", parent: "Eve"},
      {name: "Awan", parent: "Eve"},
      {name: "Enoch", parent: "Awan"},
      {name: "Azura", parent: "Eve"}
    ];
  }
}
