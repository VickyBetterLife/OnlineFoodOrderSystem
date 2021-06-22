<template>
  <div>
    <!-- breadcrumb navigation -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">OrderManagement</a></el-breadcrumb-item>
      <el-breadcrumb-item>AllOrders</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--search and add area -->

      <el-row :gutter="20">
        <el-col :span="9">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getOrderlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderlist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >Add User</el-button
          >
        </el-col>
      </el-row>

      <el-table id="orderlist" border stripe>
        <!-- <el-table-column type="index"></el-table-column>
        <el-table-column label="customer" prop="customer"></el-table-column>
        <el-table-column
          label="destination"
          prop="destination"
        ></el-table-column>
        <el-table-column label="event_name" prop="event_name"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="item" prop="item"></el-table-column>
        <el-table-column label="price" prop="price"></el-table-column>
        <el-table-column
          label="sent_at_second"
          prop="sent_at_second"
        ></el-table-column> -->
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 5,
        pagesize: 2
      },
      orderlist: [],
      total: 0,
      dialogVisible: false
    }
  },
  mounted() {
    this.getOrderlist()
  },
  methods: {
    getOrderlist() {
      setTimeout(() => {
        console.log('length:', this.$allOrders.length)
        if (this.$allOrders.length <= 0) {
          this.getOrderlist()
          return
        }
        console.log('getOrderList')
        const curData = this.$allOrders[0]
        this.total = curData.length
        console.log('curData:', JSON.stringify(curData))
        this.$allOrders.shift()
        const ul = document.getElementById('orderlist')
        const fragment = document.createDocumentFragment()
        for (let i = 0; i < this.queryInfo.pagesize; i++) {
          const li = document.createElement('li')
          li.innerText = curData[i].id
          fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        //  window.requestAnimationFrame(insertElement)
      }, 0)

      // this.orderlist = this.$currentData
      // console.log('orderlist:' + JSON.stringify(this.$currentData))
      /*
      this.orderlist = [
        {
          customer: 'Joel Heath',
          destination: '0270 Lee Club Suite 818, Elizabethmouth, CA 93558',
          event_name: 'DELIVERED',
          id: 'b7b5aa49',
          item: 'Chorizo burrito',
          price: 2999,
          sent_at_second: 116
        },
        {
          customer: 'Lynn Wilson',
          destination: '00355 Fernandez Glen Suite 931, Butlerland, CA 94738',
          event_name: 'DELIVERED',
          id: 'ef5202e4',
          item: 'Steak burrito',
          price: 6431,
          sent_at_second: 116
        },
        {
          customer: 'Joel Heath',
          destination: '0270 Lee Club Suite 818, Elizabethmouth, CA 93558',
          event_name: 'DELIVERED',
          id: 'b7b5aa49',
          item: 'Chorizo burrito',
          price: 2999,
          sent_at_second: 116
        },
        {
          customer: 'Lynn Wilson',
          destination: '00355 Fernandez Glen Suite 931, Butlerland, CA 94738',
          event_name: 'DELIVERED',
          id: 'ef5202e4',
          item: 'Steak burrito',
          price: 6431,
          sent_at_second: 116
        }
      ]
      */
      this.total = this.orderlist.length
    },
    // handleSizeChange(newSize) {
    //   console.log('size:' + newSize)
    //   this.queryInfo.pagesize = newSize
    //   this.getOrderlist()
    // },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderlist()
    },
    async addUser() {
      const { data: res } = await this.$http.post('users', this.addForm)
      if (res.meta.status !== 201) return this.$message.error('add user fail')
      this.$message.success('add user successfully')
      this.dialogVisible = false
      this.getOrderlist()
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
