<template>
  <h2>权限列表</h2>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="Approved by">
      <el-input placeholder="Approved by"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    @selection-change="handleSelectionChange"
    stripe
    style="width: 100%"
  >
    <el-table-column type="selection" width="120" />
    <el-table-column prop="permsId" label="id" width="240" />
    <el-table-column prop="menuName" label="描述" width="400" />
    <el-table-column prop="path" label="路径" width="300" />
    <el-table-column prop="createTime" label="创建时间" width="300" />
    <el-table-column label="操作">
      <el-button type="danger" plain>删除</el-button>
    </el-table-column>
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
    handleSelectionChange(e) {
      console.log(e);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped></style>
