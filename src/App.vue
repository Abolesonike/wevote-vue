<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
#app{
  height 100%

}
body{
  margin 0
  overflow-x hidden
  height 100%
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

<script type="text/javascript">
(function () {
  if (window.zhuge) return;
  var addListener = Element.prototype.addEventListener;
  window.zgclickhook = true;
  function zgListener() {
    if (window.zhuge && window.zhuge.trackClick)
      window.zhuge.trackClick(arguments[0]);
  }
  Element.prototype.addEventListener = function () {
    var etype = arguments[0];
    var listener = arguments[1];
    if (etype === "click" && listener) {
      this.setAttribute("zgclickable", true);
      this.setAttribute(
        "zghook",
        parseInt(this.getAttribute("zghook") || 0) + 1
      );
      if (parseInt(this.getAttribute("zghook")) === 1)
        addListener.call(this, "click", zgListener);
    }
    return addListener.apply(this, arguments);
  };
  var removeListener = Element.prototype.removeEventListener;
  Element.prototype.removeEventListener = function () {
    var etype = arguments[0];
    this.setAttribute("zghook", parseInt(this.getAttribute("zghook") || 0) - 1);
    if (etype === "click" && parseInt(this.getAttribute("zghook")) <= 0) {
      this.removeAttribute("zgclickable");
      removeListener.call(this, etype, zgListener);
    }
    removeListener.apply(this, arguments);
  };
  window.zhuge = [];
  window.zhuge.methods =
    "_init identify track trackRevenue getDid getSid getKey setSuperProperty setUserProperties setWxProperties setPlatform".split(
      " "
    );
  window.zhuge.factory = function (b) {
    return function () {
      var a = Array.prototype.slice.call(arguments);
      a.unshift(b);
      window.zhuge.push(a);
      return window.zhuge;
    };
  };
  for (var i = 0; i < window.zhuge.methods.length; i++) {
    var key = window.zhuge.methods[i];
    window.zhuge[key] = window.zhuge.factory(key);
  }
  window.zhuge.load = function (b, x) {
    if (!document.getElementById("zhuge-js")) {
      var a = document.createElement("script");
      var verDate = new Date();
      var verStr =
        verDate.getFullYear().toString() +
        verDate.getMonth().toString() +
        verDate.getDate().toString();

      a.type = "text/javascript";
      a.id = "zhuge-js";
      a.async = !0;
      a.src = "https://zgsdk.zhugeio.com/zhuge.min.js?v=" + verStr;
      a.onerror = function () {
        window.zhuge.identify = window.zhuge.track = function (
          ename,
          props,
          callback
        ) {
          if (
            callback &&
            Object.prototype.toString.call(callback) === "[object Function]"
          ) {
            callback();
          } else if (
            Object.prototype.toString.call(props) === "[object Function]"
          ) {
            props();
          }
        };
      };
      var c = document.getElementsByTagName("script")[0];
      c.parentNode.insertBefore(a, c);
      window.zhuge._init(b, x);
    }
  };
  window.zhuge.load("871cc7bbce6341eeb155c57755a728c6", {
    //配置应用的AppKey
    superProperty: {
      //全局的事件属性(选填)
      应用名称: "诸葛io",
    },
    adTrack: false, //广告监测开关，默认为false
    zgsee: false, //视屏采集开关， 默认为false
    autoTrack: false,
    //启用全埋点采集（选填，默认false）
    singlePage: false, //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
    debug: true,
});
})();
</script>
