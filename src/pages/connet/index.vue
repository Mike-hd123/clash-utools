<template>
  <el-card style="height: 502px">
    <el-table-v2
      style="margin-left: -10px; margin-top: -20px"
      :columns="columns"
      :data="connet"
      :width="560"
      :height="490"
      row-key="id"
      @click="click"
      fixed
    />
  </el-card>
</template>

<script setup>
import { ref } from "vue";

const connet = ref([]);
const columns = ref([
  {
    title: "域名",
    key: "metadata.host",
    dataKey: "metadata.host",
    align: "center",
    width: 140,
  },
  {
    title: "网络",
    key: "metadata.network",
    dataKey: "metadata.network",
    align: "center",
    width: 140,
  },
  {
    title: "提供者",
    key: "chains",
    dataKey: "chains",
    align: "center",
    width: 140,
    cellRenderer: ({ cellData: provider }) => provider[provider.length - 1],
  },
  {
    title: "规则",
    key: "rule",
    dataKey: "rule",
    align: "center",
    width: 140,
  },
]);

window.clash.getConnet().then((res) => {
  connet.value = res.data.connections;
});

function click(res) {
  console.log(res);
}
</script>