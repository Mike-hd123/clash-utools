<template>
  <div class="sidebar">
    <div class="up">
      <el-menu class="menu" default-active="proxy" router>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item, i) in radiusGroup"
            :key="i"
            :index="item.url"
            >{{ item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-menu>
    </div>
    <div class="down">
      <div class="sidebar-version">
        <span class="sidebar-version-label">Clash</span>
        <span class="sidebar-version-text">
          {{ data.version }}
        </span>
        <span class="sidebar-version-label" v-show="data.premium">Premium</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import clash from "../clash-api";

const data = ref({
  premium: false,
  version: "2021-1-8",
});

const radiusGroup = ref([
  {
    name: "代理",
    url: "proxy",
  },
  {
    name: "日志",
    url: "log",
  },
  {
    name: "规则",
    url: "rule",
  },
  {
    name: "链接",
    url: "connet",
  },
  {
    name: "配置",
    url: "config",
  },
  {
    name: "设置",
    url: "setting",
  },
]);

clash.getVersion().then((obj) => {
  const { data: res } = obj;
  data.value = res;
});
</script>


<style scoped>
.sidebar {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
.image {
  margin: 10px 50px 0px 55px;
}
.menu {
  border-right: none;
}
.el-menu-item {
  margin: 10px 18px 10px 18px;
  padding-left: 53px !important ;
  border-radius: 50px;
}
.is-active {
  background: #3697f9;
  color: white;
  border-radius: 50px;
}
.dow {
  width: 100px;
  height: 100px;
}
.sidebar-version {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}

.sidebar-version-label {
  font-size: 14px;
  color: #2c8af8;
  text-shadow: 0 2px 6px rgb(44 138 248 / 40%);
}

.sidebar-version-text {
  text-align: center;
  font-size: 14px;
  margin: 8px 0;
  padding: 0 10px;
  color: #54759a;
}
</style>