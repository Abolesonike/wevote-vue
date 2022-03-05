<template>
  <el-container>
    <el-header style="background-color: #50616d">
      <Header></Header>
    </el-header>
    <el-main
      style="background-color: #424c50; overflow-x: hidden; height: 100%"
    >
      <el-row style="background-color: #424c50">
        <el-col class="hidden-md-and-down" :xl="2"></el-col>
        <el-col :xs="0" :sm="0" :md="6" :lg="4" :xl="4"
          ><aside-menu style="margin: 10px"></aside-menu
        ></el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="14">
          <position-card :msg="positionData"></position-card>
          <el-card class="manageCard">
            <el-tabs>
              <el-tab-pane label="社区详情" v-model="community">
                <div>
                  <h4>{{ community.name }}</h4>
                </div>
                <el-image
                  src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
                  style="width: 50%"
                  fit="contain"
                ></el-image>
                <p style="font-size: small">
                  <i class="icon-taolun iconfont"></i>帖子:{{
                    community.postNum
                  }}
                  <i class="icon-tuandui iconfont"></i>成员:{{
                    community.userNum
                  }}
                </p>
                <div>
                  <p>
                    {{ community.introduction }}
                  </p>
                </div>
                <el-button>编辑社区介绍</el-button>
                <el-button>发布公告</el-button>
                <el-button>解散社区</el-button>
              </el-tab-pane>
              <el-tab-pane label="社区成员">
                <el-table :data="userTableData" style="width: 100%">
                  <el-table-column prop="name" label="用户名" width="180" />
                  <el-table-column prop="date" label="加入时间" width="180" />
                  <el-table-column prop="postNum" label="发帖" width="80" />
                  <el-table-column prop="commentNum" label="评论" width="80" />
                  <el-table-column prop="likeNum" label="点赞" width="80" />
                  <el-table-column label="操作">
                    <el-button type="primary">详情</el-button>
                    <el-button type="primary">移出社区</el-button>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="成员申请">
                <el-table :data="postTableData" style="width: 100%">
                  <el-table-column prop="title" label="用户名" width="180" />
                  <el-table-column prop="date" label="申请时间" width="180" />
                  <el-table-column
                    prop="postUser"
                    label="申请理由"
                    width="80"
                  />
                  <el-table-column label="操作">
                    <el-button type="primary">通过</el-button>
                    <el-button type="primary">拒绝</el-button>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="发帖管理">
                <el-table :data="postTableData" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="date" label="发送时间" width="180" />
                  <el-table-column prop="postUser" label="发送者" width="80" />
                  <el-table-column prop="status" label="状态" width="80" />
                  <el-table-column prop="commentNum" label="评论" width="80" />
                  <el-table-column prop="likeNum" label="点赞" width="80" />
                  <el-table-column label="操作">
                    <el-button type="primary">详情</el-button>
                    <el-button type="primary">删除</el-button>
                    <el-button type="primary">精华</el-button>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="公告管理">
                <el-table :data="postTableData" style="width: 100%">
                  <el-table-column prop="title" label="标题" width="180" />
                  <el-table-column prop="date" label="发送时间" width="180" />
                  <el-table-column prop="status" label="状态" width="80" />
                  <el-table-column label="操作">
                    <el-button type="primary">详情</el-button>
                    <el-button type="primary">紧急</el-button>
                    <el-button type="primary">置顶</el-button>
                    <el-button type="primary">删除</el-button>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
        <el-col class="hidden-md-and-down" :xl="5"></el-col>
      </el-row>
    </el-main>
    <el-footer style="background-color: #50616d; height: 100px">
      <Footer></Footer>
    </el-footer>
  </el-container>
  <el-backtop />
</template>

<script>
import Header from "@/components/Header";
import AsideMenu from "@/components/AsideMenu";
import positionCard from "@/components/positionCard";
import Footer from "@/components/Footer";
import { select } from "@/api/community/community";
export default {
  name: "communityManageView",
  components: { Header, AsideMenu, positionCard, Footer },
  data() {
    return {
      positionData: [
        { name: "首页", path: "/" },
        { name: "我创建的社区", path: "/myCreatedCommunity" },
        { name: decodeURI(this.$route.path.split("&")[1]), path: "" },
      ],
      community: {
        id: 0,
      },
    };
  },
  methods: {
    loadCommunityInfo() {
      const _this = this;
      select(1, 1, _this.community).then(function (resp) {
        // console.log(resp);
        _this.community = resp.list[0];
      });
      return 1;
    },
    loadCommunityMember() {
      return 1;
    },
    loadCommunityApply() {
      return 1;
    },
    loadCommunityPost() {
      return 1;
    },
    loadCommunityNotice() {
      return 1;
    },
  },
  mounted() {
    const _this = this;
    _this.community.id = Number(this.$route.path.split("&")[0].split("/")[2]);
    this.loadCommunityInfo();
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
.manageCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
