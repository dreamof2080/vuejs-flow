import Mock from 'mockjs'

Mock.mock('/api/flow/detail', () => {
  return Mock.mock(
    [
      {
        workflowid: 1,
        name: "采购申请采购申请采购申请",
        parent: "",
        type: 0,
        requestinfo: ['1'],
        analysisData: {
          begin: "2018-01-01 01:01:01",
          end: "2018-01-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "1",
              flowNo: "P20180101001",
              title: "采购申请-刘",
              reqDate: "2018-01-01 01:01:01",
              endDate: "2018-01-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 2,
        name: "采购评审",
        parent: "1",
        type: 0,
        requestinfo: ['2'],
        analysisData: {
          begin: "2018-02-01 01:01:01",
          end: "2018-02-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "2",
              flowNo: "P20180201001",
              title: "采购评审-刘",
              reqDate: "2018-02-01 01:01:01",
              endDate: "2018-02-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 21,
        name: "采购到货",
        parent: "1",
        type: 0,
        requestinfo: ['2'],
        analysisData: {
          begin: "2018-02-01 01:01:01",
          end: "2018-02-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "2",
              flowNo: "P20180201001",
              title: "采购评审-刘",
              reqDate: "2018-02-01 01:01:01",
              endDate: "2018-02-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 3,
        name: "银行预付款申请",
        parent: "2",
        type: 0,
        requestinfo: ['3'],
        analysisData: {
          begin: "2018-03-01 01:01:01",
          end: "2018-03-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "3",
              flowNo: "P20180301001",
              title: "银行预付款申请-刘",
              reqDate: "2018-03-01 01:01:01",
              endDate: "2018-03-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 3.1,
        name: "行政采购费用报销",
        parent: "2",
        type: 0,
        requestinfo: ['3'],
        analysisData: {
          begin: "2018-03-01 01:01:01",
          end: "2018-03-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "3",
              flowNo: "P20180301001",
              title: "银行预付款申请-刘",
              reqDate: "2018-03-01 01:01:01",
              endDate: "2018-03-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 41,
        name: "物资入库(库管操作)",
        parent: "21",
        type: 0,
        requestinfo: ['3'],
        analysisData: {
          begin: "2018-03-01 01:01:01",
          end: "2018-03-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "3",
              flowNo: "P20180301001",
              title: "银行预付款申请-刘",
              reqDate: "2018-03-01 01:01:01",
              endDate: "2018-03-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 42,
        name: "物资入库(宿管操作)",
        parent: "21",
        type: 0,
        requestinfo: ['3'],
        analysisData: {
          begin: "2018-03-01 01:01:01",
          end: "2018-03-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "3",
              flowNo: "P20180301001",
              title: "银行预付款申请-刘",
              reqDate: "2018-03-01 01:01:01",
              endDate: "2018-03-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 51,
        name: "物资出库(员工操作)",
        parent: "41",
        type: 0,
        requestinfo: ['3'],
        analysisData: {
          begin: "2018-03-01 01:01:01",
          end: "2018-03-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "3",
              flowNo: "P20180301001",
              title: "银行预付款申请-刘",
              reqDate: "2018-03-01 01:01:01",
              endDate: "2018-03-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
      {
        workflowid: 52,
        name: "物资出库(宿管操作)",
        parent: "41",
        type: 0,
        requestinfo: ['3'],
        analysisData: {
          begin: "2018-03-01 01:01:01",
          end: "2018-03-02 01:01:01",
          hours: 24,
          userTotal: 4,
          orgTotal: 2,
          reqDetails: [
            {
              requestid: "3",
              flowNo: "P20180301001",
              title: "银行预付款申请-刘",
              reqDate: "2018-03-01 01:01:01",
              endDate: "2018-03-02 01:01:01",
              reqMan: "刘某某",
              node: "部门经理审批",
              nodeids: "1",
              hours: 24,
              userTotal: 4,
              orgTotal: 2,
            }
          ],
        }
      },
    ]
  )
});
