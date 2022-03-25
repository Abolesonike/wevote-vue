<template>
  <div class="commentCard">
    <el-row>
      <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2"
        ><div>
          <el-avatar :size="50" :src="comment.fromUserHead"></el-avatar></div
      ></el-col>
      <el-col :xs="18" :sm="21" :md="21" :lg="22" :xl="22"
        ><div>
          <span style="font-weight: bold">{{ comment.fromUserName }}</span>
          <br />
          <span style="font-size: 14px">{{ comment.createTime }}</span>
        </div>
      </el-col>
    </el-row>
    <p>{{ comment.content }}</p>
    <el-row>
      <!--      <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="2">-->
      <!--        <i class="icon-zan iconfont"></i>-->
      <!--        <span class="likeText"> 0</span>-->
      <!--      </el-col>-->
      <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="2">
        <i
          class="icon-xiaoxi2 iconfont"
          @click="commentInputShow = !commentInputShow"
        ></i>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="commentInputShow">
        <comment-input
          :to-user-id="comment.fromUserId"
          :type="2"
          :belong="comment.id"
          @commitComment="getComment"
        ></comment-input>
      </div>
    </el-collapse-transition>
  </div>

  <div
    v-for="(comment2, index) in comment.replay2replay"
    v-bind:key="comment2.id"
    class="commentCard"
  >
    <el-row>
      <el-col :span="20" :offset="1">
        <div>
          <el-row>
            <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2"
              ><div>
                <el-avatar
                  :size="40"
                  :src="comment2.fromUserHead"
                ></el-avatar></div
            ></el-col>
            <el-col :xs="18" :sm="21" :md="21" :lg="22" :xl="22"
              ><div>
                <span style="font-weight: bold">{{
                  comment2.fromUserName
                }}</span>
                回复
                <span style="font-weight: bold">{{ comment2.toUserName }}</span>
                <br />
                <span style="font-size: 12px">{{ comment2.createTime }}</span>
              </div>
            </el-col>
          </el-row>
          <p>{{ comment2.content }}</p>
          <el-row>
            <!--            <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="2">-->
            <!--              <i class="icon-zan iconfont"></i>-->
            <!--              <span class="likeText"> 0</span>-->
            <!--            </el-col>-->
            <el-col :xs="8" :sm="4" :md="4" :lg="4" :xl="2">
              <i
                class="icon-xiaoxi2 iconfont"
                @click="showReplayInput(index)"
              ></i>
            </el-col>
          </el-row>
          <el-collapse-transition>
            <div v-show="replayInputShow[index]">
              <comment-input
                :to-user-id="comment2.fromUserId"
                :type="3"
                :belong="comment.id"
                :to-comment="comment2.id"
                @commitComment="getComment"
              ></comment-input>
            </div>
          </el-collapse-transition>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-divider class="comment-divider"></el-divider>
</template>

<script>
import commentInput from "@/components/commentInput";
export default {
  emits: ["commitComment1"],
  name: "commentCard",
  components: { commentInput },
  props: {
    comment: Object,
  },
  data() {
    return {
      replayInputShow: [],
      commentInputShow: false,
    };
  },
  mounted() {
    for (let i = 0; i < this.comment.replay2replay.length; i++) {
      this.replayInputShow[i] = false;
    }
    // console.log(this.commentInputShow);
  },
  methods: {
    showReplayInput(index) {
      this.replayInputShow[index] = !this.replayInputShow[index];
    },
    getComment() {
      const _this = this;
      this.commentInputShow = false;
      for (let i = 0; i < this.comment.replay2replay.length; i++) {
        this.replayInputShow[i] = false;
      }
      setTimeout(function () {
        _this.$emit("commitComment1");
      }, 1000);
    },
  },
};
</script>

<style scoped>
.commentCard {
  background-color: #50616d;
  margin: 20px;
}
</style>

<style>
.comment-divider {
  background-color: #424c50 !important;
}
</style>
