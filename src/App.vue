<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
body{
  margin 0
  overflow-x hidden
}
  // 表格标题颜色
.el-form-item__label{
  color: #424C50 !important
}
.el-tabs__active-bar {
  background-color: #7397ab !important;
}
.el-tabs__item.is-active {
  color: #7397ab !important;
}
.el-tabs__item {
  color: white !important;
  font-size: 16px !important;
  height: 60px !important;
  line-height: 60px !important;
}
</style>
