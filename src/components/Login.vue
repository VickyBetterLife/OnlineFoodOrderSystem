<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录保单区域 -->
      <el-form
        ref="loginData"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button type="info" @click="resetLoginData">Rset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // the login data
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // the form validation rules
      loginFormRules: {
        username: [
          {
            required: true,
            message: 'Please input the username',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: 'The length of username must be between 3-10',
            trigger: 'blur'
          }
        ], // validate username
        password: [
          {
            required: true,
            message: 'Please input the password',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: 'The length of password must be between 6-15',
            trigger: 'blur'
          }
        ] // validate password
      }
    }
  },
  methods: {
    // reset login info
    resetLoginData() {
      console.log(this)
      this.$refs.loginData.resetFields()
    },
    login() {
      // this.$http.interceptors.request.use(config => {
      //   console.log('config:' + JSON.stringify(config))
      //   config.headers.Authorization = window.sessionStorage.getItem('token')
      //   return config
      // })

      // this.$http.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

      this.$refs.loginData.validate(async valid => {
        if (!valid) return

        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('login failed!')
        }
        this.$message.success('login success!')
        window.sessionStorage.setItem('token', res.data.token)

        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: brown;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid black;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px grey;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: gray;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
