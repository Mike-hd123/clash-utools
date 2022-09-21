<template>
  <el-container class="app">
    <el-aside width="175px">
      <sidebar />
    </el-aside>
    <el-main>
      <router-view class="router" />
    </el-main>
  </el-container>
</template>

<script setup>
import sidebar from "./Sidebar/index.vue";
</script>

<style>
html,
body,
.router,
.app,
#app {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
</style>
