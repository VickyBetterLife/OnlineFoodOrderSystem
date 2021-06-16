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
            @clear="getOrders"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >Add User</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
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
        ></el-table-column>
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
        pagenum: 1,
        pagesize: 2
      },
      orderlist: [],
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getOrders()
  },
  methods: {
    getOrders() {
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
      this.total = this.orderlist.length
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getOrders()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
    },
    async userStateChanged(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('Put user status fail!')
      }
      console.log(res)
      this.$message.success('Put user status success!')
    },
    dialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    async addUser() {
      const { data: res } = await this.$http.post('users', this.addForm)
      if (res.meta.status !== 201) return this.$message.error('add user fail')
      this.$message.success('add user successfully')
      this.dialogVisible = false
      this.getOrders()
    }

  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
