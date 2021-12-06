<template>
  <h2>权限列表</h2>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="permsId" label="id" width="180" />
    <el-table-column prop="menuName" label="描述" width="240" />
    <el-table-column prop="path" label="路径" width="240" />
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="pages"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
import { permsList } from "@/api/perms/perms";

export default {
  name: "userTable",
  data() {
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      tableData: [],
      pages: 10,
    };
  },

  methods: {
    loadData() {
      const _this = this;
      permsList(this.pageInfo.pageNum, this.pageInfo.pageSize).then(function (
        resp
      ) {
        console.log(resp);
        _this.tableData = resp.list;
        _this.pages = resp.pages * 10;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      permsList(currentPageNum, this.pageInfo.pageSize).then(function (resp) {
        _this.tableData = resp.list;
        _this.pages = resp.pages * 10;
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped></style>
