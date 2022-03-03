<template>
  <h3>分类管理</h3>
  <el-form :inline="true" :model="classification" class="demo-form-inline">
    <el-form-item label="社区名称" size="small">
      <el-input placeholder="社区名称" v-model="classification.name"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" size="small">
      <el-date-picker
        v-model="classification.creationDateStart"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      到
      <el-date-picker
        v-model="classification.creationDateEnd"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item size="small">
      <el-button type="primary" icon="el-icon-search" @click="search()"
        >查询</el-button
      >
      <el-button icon="el-icon-refresh-left" @click="classification = {}"
        >重置</el-button
      >
    </el-form-item>
  </el-form>
  <el-table :data="classificationList" style="width: 100%">
    <el-table-column prop="id" label="分类编号" width="200" />
    <el-table-column prop="name" label="分类名称" width="300" />
    <el-table-column prop="communityNum" label="社区数量" width="200" />
    <el-table-column label="启用状态">
      <template v-slot="scope">
        <el-switch
          v-model="scope.row.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          @change="changeEnableStatus(scope.row)"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="creationDate" label="创建时间" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          type="danger"
          @click="deleteOne(scope.row)"
          plain
          size="small"
          >删除分类</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <br />
  <el-button type="primary" @click="dialogFormVisible = true"
    >新建分类</el-button
  >
  <el-dialog
    width="400px"
    destroy-on-close
    v-model="dialogFormVisible"
    title="新建分类"
  >
    <el-form
      ref="postForm"
      :rules="rules"
      :model="newClassification"
      label-position="top"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input
          v-model="newClassification.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch
          v-model="newClassification.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="insertOne()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  deleteOneClassification,
  insertOneClassification,
  selectCommClassification,
  updateCommClassification,
} from "@/api/community/communityClassification";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";

export default {
  name: "classification",
  data() {
    return {
      classificationList: [],
      classification: {
        name: "",
        creationDateStart: "",
        creationDateEnd: "",
      },
      newClassification: {
        name: "",
        status: 1,
      },
      dialogFormVisible: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入分类名称！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    loadData() {
      const _this = this;
      selectCommClassification(_this.classification).then(function (resp) {
        for (let i = 0; i < resp.length; i++) {
          // 格式化日期
          resp[i].creationDate = dayjs(resp[i].creationDate).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.classificationList = resp;
      });
    },
    changeEnableStatus(row) {
      let text = "";
      if (row.status === 1) {
        text = "启用";
      } else {
        text = "禁用";
      }
      row.creationDate = dayjs(row.creationDate).format("YYYY-MM-DDTHH:mm:ss");
      updateCommClassification(row).then(function (resp) {
        if (resp === true) {
          ElNotification({
            title: "操作成功",
            message: row.name + "分类已被" + text,
            type: "success",
            position: "bottom-right",
          });
        }
      });
    },
    search() {
      const _this = this;
      _this.loadData();
    },
    deleteOne(row) {
      const _this = this;
      if (row.communityNum !== 0) {
        ElNotification({
          title: "操作失败",
          message: row.name + "分类存在社区，不可删除！",
          type: "error",
          position: "bottom-right",
        });
        return;
      }
      deleteOneClassification(row.id).then(function (resp) {
        if (resp === true) {
          _this.loadData();
          ElNotification({
            title: "操作成功",
            message: row.name + "分类删除成功！",
            type: "success",
            position: "bottom-right",
          });
        } else {
          ElNotification({
            title: "操作失败",
            message: row.name + "分类删除失败！",
            type: "error",
            position: "bottom-right",
          });
        }
      });
    },
    insertOne() {
      const _this = this;
      this.$refs["postForm"].validate((valid) => {
        if (valid) {
          insertOneClassification(_this.newClassification).then(function (
            resp
          ) {
            if (resp === true) {
              _this.dialogFormVisible = false;
              _this.loadData();
              ElNotification({
                title: "操作成功",
                message: _this.newClassification.name + "分类添加成功！",
                type: "success",
                position: "bottom-right",
              });
            } else {
              _this.dialogFormVisible = false;
              ElNotification({
                title: "操作失败",
                message:
                  _this.newClassification.name +
                  "分类添加失败！\n 检查分类是否已经存在！",
                type: "error",
                position: "bottom-right",
              });
            }
          });
        }
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped></style>
