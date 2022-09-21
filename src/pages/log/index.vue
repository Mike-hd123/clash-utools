<template>
  <el-card style="height: 502px">
    <div>
      <span>日志水平:</span>
      <el-cascader
        style="margin-left: 10px"
        size="small"
        v-model="choose"
        :options="options"
        @change="change"
      />
    </div>
    <ul class="logs-panel">
      <el-scrollbar height="430px">
        <li v-for="(item, k) in log" :key="k">
          <span>[{{ item.date }}]</span>
          <span>[{{ item.type }}]</span>
          <span>{{ item.payload }}</span>
        </li>
      </el-scrollbar>
    </ul>
  </el-card>
</template>

<script setup>
import { ref } from "vue";

const log = ref([]);
const choose = ref("");
const options = ref([
  {
    value: "info",
    label: "info",
  },
  {
    value: "warning",
    label: "warning",
  },
  {
    value: "error",
    label: "error",
  },
  {
    value: "debug",
    label: "debug",
  },
]);

window.clash.getConfigs().then((res) => {
  choose.value = res.data["log-level"];
});

window.clash.getLog({
  level: choose.value[0],
  back: (msg) => {
    const data = JSON.parse(msg.data);
    data.date = new Date().toLocaleString();
    log.value.push(data);
  },
});

function change() {
  window.clash.setConfig({ log_level: choose.value[0] });
  window.clash.getLog({
    level: choose.value[0],
    back: (msg) => {
      const data = JSON.parse(msg.data);
      data.date = new Date().toLocaleString();
      log.value.push(data);
    },
  });
}
</script>

<style>
.logs-panel {
  display: flex;
  height: 420px;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  list-style: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 2px;
  background-color: #f3f6f9;
  font-size: 12px;
  color: #73808f;
  overflow-y: auto;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
    monospace;
}
</style>