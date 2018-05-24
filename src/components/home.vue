<template>
    
    <el-container style="height: 100%;">
        <el-header style="margin: 20px;height: 150px;">
            <img src="../assets/logo.png">
            <h1>{{ msg }}</h1>
        </el-header>
        <el-container>
        
        <el-aside style="width: 200px;height: 100%;">
            <el-menu :default-openeds="['1', '2', '3']" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">总览</span>
                
                </template>
                
                <el-menu-item-group>
                <!-- <span slot="title">分组一</span> -->
                <el-menu-item index="/home/overview">消费浏览</el-menu-item>
                <el-menu-item index="/home/month">月消费报表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">记录</span>
                </template>
                <el-menu-item-group>
                <!-- <span slot="title">分组一</span> -->
                <el-menu-item index="/home/record">记一笔</el-menu-item>
                <el-menu-item index="/home/category">消费分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">设定</span>
                </template>
                <el-menu-item-group>
                <!-- <span slot="title">分组一</span> -->
                <el-menu-item index="/home/setting">设置</el-menu-item>
                <el-menu-item index="/home/backup">备份</el-menu-item>
                <el-menu-item index="/home/recovery">恢复</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>
        <!-- <div class="el-scrollbar__bar is-vertical"><div class="el-scrollbar__thumb" style="transform: translateY(170.114%); height: 32.4125%;"></div></div> -->
        <el-main>
            <router-view></router-view>
        </el-main>
        
        </el-container>
        
    </el-container>
  
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  data () {
    return {
      msg: 'Bill',
      username: "xxx",
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
}
img {
    width: 100px;
    height: 100px;
    /* margin-top: 10px; */
}
</style>
