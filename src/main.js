// ElementPlus
// import "./style/element/index.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// require("element-plus/dist/index.css");
import zhCn from "element-plus/es/locale/lang/zh-cn";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// icon
import "./assets/icon/font_2936896_k1l8gt2jgd8/iconfont.css";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount("#app");
