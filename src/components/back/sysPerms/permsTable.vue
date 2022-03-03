<template>
  <h2>权限列表</h2>
  <el-table
    :data="tableData"
    class="permsTable"
    height="620"
    :border="true"
    lazy
    :load="load"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    row-key="permsId"
  >
    <el-table-column prop="permsId" label="id" width="240" />
    <el-table-column prop="menuName" label="描述" width="400" />
    <el-table-column prop="path" label="路径" width="300" />
    <el-table-column prop="createTime" label="创建时间" width="300" />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          type="info"
          plain
          size="small"
          @click="showAddPermsForm(scope.row)"
          >添加</el-button
        >
        <el-popconfirm
          title="删除后无法恢复，确定删除吗？"
          v-if="scope.row.hasChildren !== true"
          @confirm="deletePerms(scope.row.permsId)"
        >
          <template #reference>
            <el-button plain size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-row :gutter="20" style="margin-top: 10px">
    <el-col :span="12" :offset="0"
      ><el-pagination
        background
        layout="prev, pager, next"
        :total="pages"
        @current-change="handleCurrentChange"
      >
      </el-pagination
    ></el-col>
    <el-col :span="2" :offset="9">
      <el-button type="primary" @click="showAddPermsForm(null)"
        >添加父级权限</el-button
      ></el-col
    >
  </el-row>

  <el-dialog
    title="添加权限"
    width="30%"
    destroy-on-close
    center
    v-model="dialogFormVisible"
  >
    <div v-if="nowRow != null" style="font-size: 15px">
      <h3>父级权限</h3>
      <p>描述：{{ nowRow.menuName }}</p>
      <p>路径：{{ nowRow.path }}</p>
      <el-divider></el-divider>
    </div>

    <h3>添加权限</h3>
    <el-form :rules="rules" ref="addPermsForm" :model="newPermsForm">
      <el-form-item label="描述" prop="menuName">
        <el-input
          v-model="newPermsForm.menuName"
          autocomplete="描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="newPermsForm.path" autocomplete="路径">
          <template v-if="nowRow != null" #prepend>{{ nowRow.path }}</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button style="width: 40%" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button style="width: 40%" type="primary" @click="addPerms()"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  addPerms,
  childrenPermsList,
  deletePerms,
  parentPermsList,
} from "@/api/perms/perms";

import { ref } from "vue";
import { ElNotification } from "element-plus";
import dayjs from "dayjs";

const dateRange = ref("");

export default {
  name: "permsTable",
  components: {},
  data() {
    var validatePath = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入路径！"));
      } else if (value.slice(0, 1) !== "/") {
        callback(new Error('路径格式错误！应该为"/path"'));
      } else {
        callback();
      }
    };
    return {
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        currentPageNum: 1,
      },
      pages: 10,
      tableData: [], // 表格数据
      dateRange: dateRange,
      dialogFormVisible: false, // 新加权限弹窗是否可见
      nowRow: {}, // 点击添加，父权限的行信息
      newPermsForm: {
        pid: 0,
        menuName: "",
        path: "",
      }, // 新加权限表格
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入描述！",
            trigger: "blur",
          },
        ],
        path: [{ validator: validatePath, required: true, trigger: "blur" }],
      },
    };
  },

  methods: {
    loadData() {
      const _this = this;
      parentPermsList(this.pageInfo.pageNum, this.pageInfo.pageSize).then(
        function (resp) {
          // console.log(resp);
          for (let i = 0; i < resp.list.length; i++) {
            // 格式化日期
            resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          _this.tableData = resp.list;
          _this.pages = resp.pages * 10;
        }
      );
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      parentPermsList(currentPageNum, this.pageInfo.pageSize).then(function (
        resp
      ) {
        for (let i = 0; i < resp.list.length; i++) {
          // 格式化日期
          resp.list[i].createTime = dayjs(resp.list[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        _this.tableData = resp.list;
        _this.pages = resp.pages * 10;
        _this.pageInfo.currentPageNum = currentPageNum;
      });
    },
    load(tree, treeNode, resolve) {
      // 加载子权限
      childrenPermsList(tree.permsId).then(function (resp) {
        for (let i = 0; i < resp.length; i++) {
          // 格式化日期
          resp[i].createTime = dayjs(resp[i].createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        resolve(resp);
      });
    },
    showAddPermsForm(row) {
      // 打开添加权限表格
      const _this = this;
      _this.nowRow = row;
      // 清空输入框内容
      _this.newPermsForm.menuName = "";
      _this.newPermsForm.path = "";
      if (row != null) {
        // 设置父级菜单id
        _this.newPermsForm.pid = row.permsId;
      } else {
        // 设置父级菜单id
        _this.newPermsForm.pid = 0;
      }
      // 打开弹窗
      _this.dialogFormVisible = true;
    },
    addPerms() {
      // 调用接口，添加权限
      const _this = this;
      this.$refs["addPermsForm"].validate((valid) => {
        if (valid) {
          // 表单校验通过
          console.log(_this.newPermsForm);
          addPerms(_this.newPermsForm).then(function (resp) {
            if (resp.code === 200) {
              _this.dialogFormVisible = false;
              _this.pageInfo.pageNum = _this.pageInfo.currentPageNum;
              _this.loadData();
              ElNotification({
                title: "操作成功",
                message: resp.message,
                type: "success",
                position: "bottom-right",
              });
            } else {
              ElNotification({
                title: "操作失败",
                message: resp.message,
                type: "error",
                position: "bottom-right",
              });
            }
          });
          // console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deletePerms(permsId) {
      deletePerms(permsId).then(function (resp) {
        if (resp === true) {
          console.log("删除成功");
        } else {
          console.log("删除失败");
        }
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
>>> .el-table .el-table__cell {
  padding: 5px 0 !important;
}
</style>
