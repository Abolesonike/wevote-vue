<template>
  <h2 v-if="status == 2">审核通过的社区</h2>
  <h2 v-if="status == 1">待审核的社区</h2>
  <h2 v-if="status == 3">审核未通过的社区</h2>
  <h2 v-if="status == 4">被隐藏的社区</h2>
  <el-form :inline="true" :model="community" class="demo-form-inline">
    <el-form-item label="社区名称" size="small">
      <el-input placeholder="社区名称" v-model="community.name"></el-input>
    </el-form-item>
    <el-form-item label="社区分类" size="small">
      <el-select
        placeholder="社区分类"
        clearable
        v-model="community.classification"
      >
        <el-option
          v-for="item in ClassificationList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间" size="small">
      <el-date-picker
        v-model="community.creationDateStart"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      到
      <el-date-picker
        v-model="community.creationDateEnd"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item size="small">
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-left" @click="restCommunity()"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
  <el-table :data="communityList" style="width: 100%">
    <el-table-column prop="id" label="社区编号" width="100" />
    <el-table-column prop="name" label="社区名称" width="300" />
    <el-table-column prop="userNum" label="成员数量" width="200" />
    <el-table-column prop="postNum" label="发帖数量" width="200" />
    <el-table-column prop="classificationName" label="社区分类" width="200" />
    <el-table-column prop="creationDate" label="创建时间" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          v-if="status == 2"
          type="primary"
          @click="changeStatus(scope.row, 4)"
          plain
          size="small"
          >隐藏社区</el-button
        >
        <el-button
          type="success"
          v-if="status == 1"
          @click="changeStatus(scope.row, 2)"
          plain
          size="small"
          >通过</el-button
        >
        <el-button
          type="warning"
          v-if="status == 1"
          @click="changeStatus(scope.row, 3)"
          plain
          size="small"
          >不通过</el-button
        >
        <el-button
          type="warning"
          v-if="status == 3"
          @click="changeStatus(scope.row, 1)"
          plain
          size="small"
          >重新审核</el-button
        >
        <el-button
          type="success"
          v-if="status == 4"
          @click="changeStatus(scope.row, 2)"
          plain
          size="small"
          >恢复</el-button
        >
        <el-button
          type="danger"
          @click="deleteComm(scope.row)"
          plain
          size="small"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    :total="pageInfo.pages"
    @current-change="handleCurrentChange"
    layout="total, sizes, prev, pager, next, jumper"
    v-model:page-size="pageInfo.pageSize"
    @size-change="handleSizeChange"
    :page-sizes="[5, 10, 20, 50, 100]"
  >
  </el-pagination>
</template>

<script>
import { deleteOne, select, update } from "@/api/community/community";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";
import { selectCommClassification } from "@/api/community/communityClassification";

export default {
  name: "communityTable",
  data() {
    return {
      communityList: [],
      ClassificationList: [],
      classification: {
        status: 0,
      },
      community: {
        name: "",
        classification: "",
        creationDateStart: "",
        creationDateEnd: "",
        status: 0,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        pages: 10,
      },
      status: 2,
    };
  },
  methods: {
    loadData() {
      const _this = this;
      select(
        _this.pageInfo.pageNum,
        _this.pageInfo.pageSize,
        _this.community
      ).then(function (resp) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].creationDate = dayjs(resp.list[i].creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.communityList = resp.list;
        _this.pageInfo.pages = resp.total;
        //console.log(_this.communityList);
      });
    },
    changeStatus(row, status) {
      const _this = this;
      const dic = {
        1: "重新审核",
        2: "审核通过",
        3: "审核未通过",
        4: "已隐藏",
      };
      row.status = status;
      row.creationDate = dayjs(row.creationDate).format("YYYY-MM-DDTHH:mm:ss");
      update(row).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "一条帖子" + dic[status],
            type: "success",
            position: "bottom-right",
          });
          _this.loadData();
        }
      });
    },
    deleteComm(row) {
      const _this = this;
      deleteOne(row.id).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: "一条帖子成功被删除！",
            type: "success",
            position: "bottom-right",
          });
          _this.loadData();
        }
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      select(currentPageNum, this.pageInfo.pageSize, this.community).then(
        function (resp) {
          for (let i = 0; i < resp.list.length; i++) {
            // 格式化日期
            resp.list[i].creationDate = dayjs(resp.list[i].creationDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          _this.communityList = resp.list;
          //console.log(_this.communityList);
        }
      );
    },
    handleSizeChange(currentPageSize) {
      // 改变页大小
      const _this = this;
      _this.pageInfo.pageSize = currentPageSize;
      select(currentPageSize, this.pageInfo.pageSize, this.community).then(
        function (resp) {
          for (let i = 0; i < resp.list.length; i++) {
            // 格式化日期
            resp.list[i].creationDate = dayjs(resp.list[i].creationDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          _this.communityList = resp.list;
          //console.log(_this.communityList);
        }
      );
    },
    search() {
      const _this = this;
      _this.pageInfo.pageNum = 1;
      _this.loadData();
    },
    restCommunity() {
      const _this = this;
      _this.community.name = "";
      _this.community.classification = "";
      _this.community.creationDateStart = "";
      _this.community.creationDateEnd = "";
    },
  },
  mounted() {
    const _this = this;
    _this.status = this.$route.params.status;
    _this.community.status = Number( this.$route.params.status);
    this.loadData();
    selectCommClassification(_this.classification).then(function (resp) {
      _this.ClassificationList = resp;
    });
  },
  watch: {
    $route() {
      const _this = this;
      this.loading = true;
      _this.status = this.$route.params.status;
      _this.community.status = Number( this.$route.params.status);
      if (_this.status != null) {
        this.loadData();
      }
    },
  },
};
</script>

<style scoped></style>
