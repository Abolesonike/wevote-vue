<template>
  <div>
    <el-form label-position="top" :rules="rules" :model="form" ref="voteForm">
      <el-form-item label="标题" prop="title" style="margin-bottom: 20px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item
        label="结束时间"
        prop="endDate"
        style="margin-bottom: 20px"
      >
        <!--        <el-radio-group v-model="form.endTime">-->
        <!--          <el-radio-button label="一天"></el-radio-button>-->
        <!--          <el-radio-button label="一周"></el-radio-button>-->
        <!--          <el-radio-button label="从不"></el-radio-button>-->
        <!--        </el-radio-group>-->
        <el-date-picker
          :disabled-date="disabledDate"
          style="margin-top: 10px"
          v-model="form.endDate"
          type="date"
          placeholder="结束时间"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选项" prop="chooses" style="margin-bottom: 20px">
        <el-tag
          v-for="tag in form.chooses"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="form.inputValue"
          class="input-new-tag"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" @click="showInput"
          >+</el-button
        >
      </el-form-item>
      <!--      <el-form-item label="正确答案">-->
      <!--        <el-checkbox label="设置正确答案"></el-checkbox>-->
      <!--      </el-form-item>-->
      <el-form-item label="多选">
        <el-select v-model="form.multiChoose" placeholder="多选数量">
          <el-option
            v-for="(item, index) in form.chooses"
            :key="index + 1"
            :label="index + 1"
            :value="index + 1"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "voteCreateCard",
  data() {
    return {
      form: {
        title: "",
        endTime: "",
        chooses: [],
        multiChoose: [{ value: "Option1", label: "Option1" }],
        inputValue: "",
        endDate: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题！",
            trigger: "blur",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请输入结束时间！",
            trigger: "change",
          },
        ],
        chooses: [
          {
            type: "array",
            min: 2,
            message: "至少添加两个选项！",
            trigger: "blur",
          },
        ],
      },
      inputVisible: false,
    };
  },
  methods: {
    handleClose(tag) {
      this.form.chooses.splice(this.form.chooses.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.form.inputValue;
      if (inputValue) {
        this.form.chooses.push(inputValue);
      }
      this.inputVisible = false;
      this.form.inputValue = "";
    },
    disabledDate(time) {
      return time.getTime() < Date.now(); //今天之后禁用
      // return time.getTime() < Date.now() - 3600 * 1000 * 24; //今天之前禁用，减去一天的毫秒数，否则今天也将禁用
      //Date.now()返回1970/01/01以来的毫秒数
    },
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
