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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
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

      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Name" prop="username"></el-table-column>
        <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="Phone" prop="mobile"></el-table-column>
        <el-table-column label="Role" prop="role_name"></el-table-column>
        <el-table-column label="State">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Method" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="showDeleteDialog(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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

    <el-dialog
      title="Add user"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="90px"
      >
        <el-form-item label="UserName:" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password:" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="Email:" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Mobile:" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancle</el-button>
        <el-button type="primary" @click="addUser">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Modify User Info"
      :visible.sync="editDiaglogVisible"
      width="50%"
    >
      <el-form
        :model="editForm"
        ref="editFormRef"
        :rules="editFormRules"
        label-width="90px"
      >
        <el-form-item label="username:">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="email:" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Mobile:" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDiaglogVisible = false" @close="editFormClosed"
          >Cancel</el-button
        >
        <el-button type="primary" @click="editDiaglogVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="Delete user"
      :visible.sync="deleteDialogVisible"
      width="50%"
      @close="deleteDiaglogVisible = false"
    >
      <span>Are you sure to delete the user?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancle</el-button>
        <el-button type="primary" @click="deleteUser">Confirm</el-button>
      </span>
    </el-dialog>
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
      total: 0,
      dialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          {
            required: true,
            message: 'Please input user name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'user name length is between 3-10',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'Password length is between 3-10',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Please input email',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'Email length is between 3-10',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: 'Please input mobile',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'mobile length is between 3-10',
            trigger: 'blur'
          }
        ]
      },
      editFormRules: {
        email: [
          {
            required: true,
            message: 'Please input email',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'Email length is between 3-10',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: 'Please input mobile',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'mobile length is between 3-10',
            trigger: 'blur'
          }
        ]
      },
      editDiaglogVisible: false,
      editForm: {},
      deleteDialogVisible: false
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
    },
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
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
      this.getUserList()
    },
    async showEditDialog(id) {
      this.editDiaglogVisible = true
      const { data: res } = await this.$http.get(`users/${id}`)
      if (res.meta.status !== 200) return this.$message.error('find user fail')
      this.editForm = res.data
    },
    editFormClosed() {
      this.$refs.editFormRef.resetFields()
    },
    showDeleteDialog(id) {
      this.deleteDialogVisible = true
    },
    async deleteUser(id) {
      this.deleteDialogVisible = false
      const { data: res } = await this.$http.delete(`users/${id}`)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('delete user fail!')
      }
      this.$message.success('delete user successfully')
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
