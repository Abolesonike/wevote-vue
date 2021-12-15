<template>
  <el-card class="manageCard">
    <el-tabs>
      <el-tab-pane label="社区详情" v-model="form">
        <div><h4>生活区</h4></div>
        <el-image
          src="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
          style="width: 50%"
          fit="contain"
        ></el-image>
        <p style="font-size: small">
          <i class="icon-taolun iconfont"></i>帖子:1000
          <i class="icon-tuandui iconfont"></i>成员:200
        </p>
        <div>
          <p>
            阿里妈妈MUX倾力打造的矢量图标管理、交流平台。 设计师将图标上传到
            iconfont
            平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。
          </p>
        </div>
        <el-button>修改社区信息</el-button>
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
          <el-table-column prop="postUser" label="申请理由" width="80" />
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
</template>

<script>
export default {
  name: "communityManageCard",
  data() {
    return {
      form: {},
      userTableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          postNum: 10,
          commentNum: 5,
          likeNum: 20,
        },
        {
          date: "2016-04-02",
          name: "Jerry",
          postNum: 1,
          commentNum: 5,
          likeNum: 20,
        },
        {
          date: "2016-05-04",
          name: "Hank",
          postNum: 13,
          commentNum: 5,
          likeNum: 200,
        },
        {
          date: "2016-05-01",
          name: "Jim",
          postNum: 25,
          commentNum: 5,
          likeNum: 100,
        },
      ],
      postTableData: [
        {
          date: "2016-05-01",
          title: "Jim",
          postUser: "Jerry",
          commentNum: 5,
          likeNum: 100,
          status: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
.manageCard {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
