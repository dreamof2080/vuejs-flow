<template>
  <div class="detailTable">
    <template>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            label="流程单号">
          <template slot-scope="scope">
            <a :href="scope.row.href" target="_blank">{{scope.row.flowNo}}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="flowTitle"
            label="流程标题">
        </el-table-column>
        <el-table-column
            width="100"
            prop="reqMan"
            label="申请人">
        </el-table-column>
        <el-table-column
            prop="currentNode"
            label="当前节点">
        </el-table-column>
        <el-table-column
            width="170"
            prop="reqDate"
            label="申请日期">
        </el-table-column>
        <el-table-column
            width="170"
            prop="finishedDate"
            label="最新处理日期">
        </el-table-column>
        <el-table-column
            width="100"
            prop="hours"
            label="耗时">
        </el-table-column>
        <el-table-column
            width="100"
            prop="employees"
            label="参与员工数">
        </el-table-column>
        <el-table-column
            width="100"
            prop="departments"
            label="参与部门数">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['workflowData'],
    data() {
      return {
        tableData: []
      }
    },
    watch: {
      workflowData: function (newData) {
        this.tableData = [];
        if (newData.type < 2 && newData.analysisData && newData.analysisData.reqDetails) {
          let url = window.location.host;
          for(let data of newData.analysisData.reqDetails){
            this.tableData.push({
              flowNo: data.flowNo,
              href: "http://"+url+"/workflow/request/workflow.jsp?targeturl=/base/blank.jsp?isclose=1&requestid="+data.requestid,
              flowTitle: data.title,
              reqMan: data.reqMan,
              currentNode: data.node,
              reqDate: data.reqDate,
              finishedDate: data.endDate,
              hours: data.hours,
              employees: data.userTotal,
              departments: data.orgTotal,
            });
          }
        }
      }
    }
  }
</script>


<style scoped>
  .detailTable{
    width:90%;
    margin:20px auto;
    background-color: #eee;
    border-radius: 5px;
  }
  .detailTable>div{
    border-radius: 5px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    background-color: #eee;
  }
  .detailTable a {
    text-decoration: none;
    color: #709cb2;
  }
</style>
