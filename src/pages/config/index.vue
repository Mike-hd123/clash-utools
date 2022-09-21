<template>
  <div>
    <el-card style="height: 502px">
      <div v-if="isUtools">
        <el-table class="table" :data="tableData" stripe height="490px">
          <el-table-column align="center" label="name">
            <template #default="scope">
              {{ scope.row.name }}
              <el-tag v-show="scope.row.use">use</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="url" prop="url" />
          <el-table-column align="center">
            <template #header>
              <el-button type="primary" @click="add">添加</el-button>
            </template>
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="detail(scope.$index)"
                >Detail</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <h1 style="margin: 15% auto auto 35%">请使用utools打开</h1>
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      title="节点信息"
      center
      align-center
      width="35%"
      style="border-radius: 15px"
    >
      <div class="input">
        <span class="input-label">名称:</span>
        <el-input
          :disabled="index !== -1"
          class="input-value"
          v-model="choose.name"
        ></el-input>
      </div>
      <div class="input">
        <span class="input-label">网址:</span>
        <el-input class="input-value" v-model="choose.url"></el-input>
      </div>
      <div class="input">
        <span class="input-label">网址:</span>
        <el-switch
          v-model="choose.use"
          class="ml-2"
          style="margin-left: 28%; --el-switch-on-color: #13ce66"
        />
      </div>
      <template #footer>
        <span style="display: flex; justify-content: space-around">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button v-show="index !== -1" type="danger" @click="del"
            >删除</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isUtools = ref(false);
const dialogVisible = ref(false);
const choose = ref({
  name: "请选择",
  url: "",
  use: true,
});
const tableData = ref([]);
const index = ref(-1);

load();

function load() {
  if (window.isUtools !== undefined) {
    isUtools.value = true;
    const res = utools.db.allDocs("clash");
    var tmp = [];
    res[0]?.data?.forEach((element) => {
      tmp.push({
        name: element,
        url: utools.dbStorage.getItem(element + ":url"),
        use: utools.dbStorage.getItem(element + ":use"),
      });
    });
    tableData.value = tmp;
  }
}

function detail(value) {
  index.value = value;
  choose.value.name = tableData.value[value].name;
  choose.value.url = tableData.value[value].url;
  choose.value.use = tableData.value[value].use;
  dialogVisible.value = true;
}

function add() {
  index.value = -1;
  choose.value = {
    name: "",
    url: "",
    use: false,
  };
  dialogVisible.value = true;
}

function del() {
  const res = utools.db.allDocs("clash");
  res[0].data.splice(index.value, 1);
  if (res.length !== 0) {
    utools.db.put({
      _id: "clash",
      data: res[0].data,
      _rev: res[0]._rev,
    });
  }
  load();
  dialogVisible.value = false;
}

function save() {
  //为空不执行任何操作
  if (choose.value.name === "" || undefined) return false;
  if (choose.value.url === "" || undefined) return false;
  //存储数据到本地
  utools.dbStorage.setItem(choose.value.name + ":url", choose.value.url);
  utools.dbStorage.setItem(choose.value.name + ":use", choose.value.use);
  //更新配置文件
  window.updata();
  //如果存在同名则不需要修改索引
  for (var i = 0; i < tableData.value.length; i++) {
    dialogVisible.value = false;
    if (tableData.value[i].name === choose.value.name) {
      load();
      return;
    }
  }
  //修改索引
  const res = utools.db.allDocs("clash");
  res[0]?.data?.push(choose.value.name);
  var data = [];
  if (res[0]?.data !== undefined) {
    data = [...res[0].data];
  } else {
    data.push(choose.value.name);
  }
  if (res[0]?._rev !== undefined) {
    utools.db.put({
      _id: "clash",
      data: data,
      _rev: res[0]._rev,
    });
  } else {
    utools.db.put({
      _id: "clash",
      data: data,
    });
  }
  dialogVisible.value = false;
  load();
}
</script>

<style scoped>
.table {
  margin-top: -20px;
}
.input {
  margin: 5px 0px 13px 0px;
}
.input-label {
  margin-right: 10px;
}
.input-value {
  width: 79%;
}
</style>