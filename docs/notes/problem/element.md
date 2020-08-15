# Element 遇到的问题

## Element 表格手风琴效果
Element表格展开行每次只能展开一行

```vue
<template>
    <el-table 
      @expand-change="expandSelect"
      type='index'
      :row-key='getRowKeys'
      :expand-row-keys="expands"
      :data="tableData" style="width: 100%"
      :default-sort = "{prop: 'payment_date', order: 'descending'}">
      <!-- 排序:default-sort sortable -->
      <el-table-column label="申请时间" prop="date_created" sortable align='left'></el-table-column>
      <el-table-column label="操作" align='left' width='100px'>
        <template slot-scope="scope">
          <button class="btn" @click="handleEdit(scope.$index, scope.row)">查看</button>
        </template>
      </el-table-column>
      <!-- expand：折叠面板 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div class="bottom_content">
            折叠面板 type为expand。方法：@expand-change="expandSelect"
            expand-change: 当用户对某一行展开或者关闭的时候会触发该事件
          </div>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <script>
  export default {
    data () {
      return {
        expands: [],
        getRowKeys (row) {
          return row.id
        },
        tableData: []
      }
    },
    methods: {
      // 折叠面板每次只能展开一行
      expandSelect (row, expandedRows) {
        var that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.id)
          }
        } else {
          that.expands = []
        }
      },
      handleEdit (index, row) {}
    }
  }
  </script>
```

