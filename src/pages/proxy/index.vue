<template>
  <el-card style="height: 502px">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-scrollbar height="415px">
        <el-tab-pane label="Global" name="global">
          <el-space wrap>
            <el-button
              v-for="(tmp, key) in btnlist"
              :key="key"
              @click="global(tmp.name)"
            >
              {{ tmp.name }}
            </el-button>
          </el-space>
        </el-tab-pane>
        <el-tab-pane label="Rule" name="rule">
          <el-collapse accordion>
            <el-collapse-item
              v-for="(item, key) in tablist"
              :key="key"
              :name="key"
            >
              <template #title>
                {{ item.name }}
                <el-tag style="margin-left: 5px">{{ item.now }}</el-tag>
              </template>
              <el-space wrap>
                <el-button
                  v-for="(tmp, key) in item.proxies"
                  :key="key"
                  @click="rule(item.name, tmp)"
                >
                  {{ tmp.name }}
                </el-button>
              </el-space>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="Direct" name="direct">
          <h1 style="margin: 30% auto auto 35%">已开启直连模式！</h1>
        </el-tab-pane>
      </el-scrollbar>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from "vue";

const activeName = ref("global");
const tablist = ref([]);
const btnlist = ref([]);

const no_show = ["REJECT", "DIRECT", "GLOBAL"];

window.clash.getConfigs().then((res) => {
  activeName.value = res.data.mode;
});

function rule(mode, node) {
  window.clash.setProxyNode(mode, node);
}

function global(node) {
  window.clash.setProxyNode("GLOBAL", node);
}

async function handleChange(name) {
  const {
    data: { providers: res },
  } = await window.clash.getProvider();
  btnlist.value = res.default.proxies;
  tablist.value = res;
  btnlist.value.forEach((item) => {
    if (item.all) {
      tablist.value[item.name].now = item.now;
    }
  });
  Reflect.deleteProperty(res, "default");
  window.clash.setConfig({ mode: name });
}
</script>
