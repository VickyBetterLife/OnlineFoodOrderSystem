<template>
  <el-container class="home-container">
    <!-- head area -->
    <el-header>
      <div>
        <img src="../assets/logo1.png" alt="" />
        <span>online food order system</span>
      </div>
      <el-button type="info" @click="logout">exit</el-button>
    </el-header>
    <!-- main area -->
    <el-container>
      <!-- aside area -->
      <el-aside :width="isCollpase ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- left side bar -->
        <el-menu
          background-color="#545c65"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollpase"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- level 1 menu -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- the template for level 1 menu -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span> {{ item.authName }} </span>
            </template>
            <!-- level 2 menu -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState(subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- right area -->
      <el-main>
        <!-- route -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollpase: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    toggleCollapse() {
      this.isCollpase = !this.isCollpase
    },
    saveNavState(acPath) {
      window.sessionStorage.setItem('activePath', '/' + acPath)
      this.activePath = '/' + acPath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333741;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
