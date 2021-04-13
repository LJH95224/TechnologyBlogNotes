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

## Element table 组件默认筛选没效果解决方案

```vue
<template>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180"
      column-key="date"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
      :filtered-value='filteredValue'
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="100">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }],
        filteredValue: ['2016-05-01', '2016-05-02']
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>
```

 如果想默认筛选，按照官网的说法加上filtered-value这个参数，但是实际并没有解决这个问题，筛选没起作用。
解决方案： 

```js
setTimeout(()=>{
  this.$refs.tableData.store.states.columns.forEach(column=>{
   	if(column.filteredValue && column.filteredValue.length){
     	this.$refs.tableData.store.commit('filterChange',{
        column,
        values:column.filteredValue,
        silent:true
      })
    }
  })
},1000);
```

