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
            prop="reqDate"
            label="申请日期">
        </el-table-column>
        <el-table-column
            prop="reqMan"
            label="申请人">
        </el-table-column>
        <el-table-column
            prop="currentNode"
            label="当前节点">
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
        tableData: [{
          flowNo: 'SP20180819001',
          href: 'www.baidu.com',
          flowTitle: '测试1',
          reqDate: '2016-05-02',
          reqMan: '王小虎',
          currentNode: '部门经理审批'
        }, {
          flowNo: 'SP20180819002',
          href: 'www.baidu.com',
          flowTitle: '测试2',
          reqDate: '2016-05-04',
          reqMan: '王小虎',
          currentNode: '部门经理审批'
        }, {
          flowNo: 'SP20180819003',
          href: 'www.baidu.com',
          flowTitle: '测试3',
          reqDate: '2016-05-01',
          reqMan: '王小虎',
          currentNode: '部门经理审批'
        }, {
          flowNo: 'SP20180819004',
          href: 'www.baidu.com',
          flowTitle: '测试4',
          reqDate: '2016-05-03',
          reqMan: '王小虎',
          currentNode: '部门经理审批'
        }]
      }
    },
    watch: {
      workflowData: function (newData, oldData) {
        this.tableData = [];
        if (newData.type < 2) {
          this.tableData.push({
            flowNo: newData.workflowid,
            href: 'www.baidu.com',
            flowTitle: '测试'+new Date().getTime(),
            reqDate: '2016-05-02',
            reqMan: '王小虎',
            currentNode: '部门经理审批'
          });
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
