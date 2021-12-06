<template>
  <el-card class="position-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="pos in data"
        v-bind:key="pos"
        :to="{ path: pos.path }"
        ><span style="color: white">{{ pos.name }}</span></el-breadcrumb-item
      >
    </el-breadcrumb>
  </el-card>
</template>

<script>
export default {
  name: "positionCard",
  props: {
    msg: Array,
  },
  data() {
    return {
      data: this.msg,
    };
  },
};
</script>

<style scoped>
.position-card {
  background: #50616d;
  border: 0;
  margin: 10px;
  border-radius: 10px;
}
</style>
