<template>
  <position-card :msg="positionData"></position-card>
  <el-card class="communityContain">
    <el-tabs tab-position="left" @tab-click="selectCommunity">
      <el-tab-pane label="推荐"
        ><el-row :gutter="25">
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            v-for="community in communityList"
            v-bind:key="community.id"
            ><community-card
              :communityData="community"
              :type="1"
            ></community-card
          ></el-col> </el-row
      ></el-tab-pane>
      <el-tab-pane
        v-for="item in commClassification"
        :key="item.id"
        :label="item.name"
        :name="item.id.toString()"
        @click="selectCommunity(item.id)"
        ><el-row :gutter="25">
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            v-for="community in communityList"
            v-bind:key="community.id"
            ><community-card
              :communityData="community"
              :type="1"
            ></community-card
          ></el-col> </el-row
      ></el-tab-pane>
      <el-pagination
        :pager-count="5"
        background
        layout="prev, pager, next"
        :total="pages"
        style="margin-bottom: 10px"
        @current-change="handleCurrentChange"
      >
      </el-pagination> </el-tabs
  ></el-card>
</template>

<script>
import positionCard from "@/components/positionCard";
import communityCard from "@/components/communityCard";
import { selectCommClassification } from "@/api/community/communityClassification";
import { select } from "@/api/community/community";

export default {
  name: "communityView",
  components: { positionCard, communityCard },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "社区", path: "" },
      ],
      // 社区分类list
      commClassification: [],
      classification: {
        status: 1,
      },
      // 社区
      community: {
        // 社区状态
        status: 2,
        // 社区分类
        classification: 0,
      },
      // 查询到的社区列表
      communityList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 9,
      },
      pages: 10,
    };
  },
  methods: {
    getClassification() {
      const _this = this;
      selectCommClassification(_this.classification).then(function (resp) {
        //console.log(resp);
        _this.commClassification = resp;
      });
    },
    handleCurrentChange(currentPageNum) {
      // 翻页
      const _this = this;
      select(currentPageNum, _this.pageInfo.pageSize, _this.community).then(
        function (resp) {
          _this.communityList = resp.list;
        }
      );
    },
    selectCommunity(tab) {
      const _this = this;
      if (tab !== null || tab !== "undefined") {
        _this.community.classification = tab.props.name;
      } else {
        _this.community.classification = 0;
      }
      select(
        _this.pageInfo.pageNum,
        _this.pageInfo.pageSize,
        _this.community
      ).then(function (resp) {
        // console.log(resp);
        _this.communityList = resp.list;
        _this.pages = resp.pages * 10;
      });
    },
  },
  mounted() {
    const _this = this;
    this.getClassification();
    select(
      _this.pageInfo.pageNum,
      _this.pageInfo.pageSize,
      _this.community
    ).then(function (resp) {
      _this.communityList = resp.list;
      _this.pages = resp.pages * 10;
    });
  },
};
</script>

<style scoped>
.el-header {
  --el-header-padding: 0 0;
  height: 90px;
}
.el-main {
  padding: 0;
}
.communityContain {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
