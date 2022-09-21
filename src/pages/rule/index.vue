<template>
  <el-card style="height: 502px">
    <el-table-v2
      style="margin-left: -10px; margin-top: -20px"
      :columns="columns"
      :data="data"
      :width="561"
      :height="490"
      fixed
  /></el-card>
</template>

<script setup>
import { ref } from "vue";

const columns = ref([
  {
    title: "类型",
    key: "type",
    dataKey: "type",
    align: "center",
    width: 187,
  },
  {
    title: "域",
    key: "payload",
    dataKey: "payload",
    align: "center",
    width: 187,
  },
  {
    title: "代理",
    key: "proxy",
    dataKey: "proxy",
    align: "center",
    width: 187,
  },
]);
const data = ref([]);

load();

async function load() {
  const {
    data: { rules: res },
  } = await window.clash.getRules();
  data.value = res;
}
</script>