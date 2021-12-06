<template>
  <el-card class="myMessageCard">
    <div style="margin-bottom: 20px">
      <span class="msgTitle">你已经加入的生活区 </span>
      <span>2021年11月19日 15:20</span>
    </div>
    <div>你已经加入的生活区</div>
  </el-card>
</template>

<script>
export default {
  name: "myMessage",
};
</script>

<style scoped>
.myMessageCard {
  background: #424c50;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
.msgTitle {
  font-size: larger;
  font-weight: bolder;
  color: whitesmoke;
}
</style>
