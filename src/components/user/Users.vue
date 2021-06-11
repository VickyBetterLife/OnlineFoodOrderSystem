<template>
  <div>
    <!-- breadcrumb navigation -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--search and add area -->

      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userlist" border stripe>
          <el-table-column type="index"></el-table-column>
        <el-table-column label="Name" prop="username"></el-table-column>
        <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="Phone" prop="mobile"></el-table-column>
        <el-table-column label="Role" prop="role_name"></el-table-column>
        <el-table-column label="State" prop="mg_state"></el-table-column>
        <el-table-column label="Method"></el-table-column>
      </el-table>
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
      userlist: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('get users fail!')
      this.userlist = res.data.users
      this.total = res.data.total
      console.log('res:')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped></style>
