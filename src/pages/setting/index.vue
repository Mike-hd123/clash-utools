<template>
  <el-card style="height: 502px">
    <el-row :gutter="20">
      <el-col :span="10">
        <span>系统代理:</span>
        <el-switch :disabled="!isUtools" v-model="system" @change="setProxy" />
      </el-col>
      <el-col :span="10">
        <span>局域网:</span>
        <el-switch v-model="lan" @change="startlan" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <span>HTTP 代理端口:</span>
        <el-input-number
          :controls="false"
          :min="0"
          v-model="http"
          @change="httpchang"
        />
      </el-col>
      <el-col :span="10">
        <span>混合代理端口:</span>
        <el-input-number
          :controls="false"
          :min="0"
          v-model="mix"
          @change="mixchang"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <span>Socks5 代理端口:</span>
        <el-input-number
          :controls="false"
          :min="0"
          v-model="socks"
          @change="sockschang"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref } from "vue";

const mix = ref(0);
const http = ref(0);
const socks = ref(0);
const system = ref(true);
const lan = ref(true);
const isUtools = ref(false);

load();

function load() {
  if (window.isUtools !== undefined) {
    isUtools.value = true;
    window.getProxyStatus((res) => (system.value = res));
  }
}

window.clash.getConfigs().then((res) => {
  const { data: data } = res;
  http.value = data.port;
  mix.value = data["mixed-port"];
  socks.value = data["socks-port"];
  lan.value = data["allow-lan"];
});

function setProxy(value) {
  if (value) window.startProxy?.call();
  else window.endProxy?.call();
}

function startlan(value) {
  window.clash.setConfig({ allow_lan: value });
}

function mixchang(value) {
  window.clash.setConfig({ port: value, scoks_port: value });
}

function httpchang(value) {
  window.clash.setConfig({ port: value });
}

function sockschang(value) {
  window.clash.setConfig({ scoks_port: value });
}
</script>

<style scoped>
.el-row {
  margin-top: 5px;
}
.el-switch {
  margin-top: -3px;
  margin-left: 5px;
}
.el-input-number {
  margin-left: 5px;
}
</style>