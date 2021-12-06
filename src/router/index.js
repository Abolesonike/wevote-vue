// import { createRouter, createWebHistory } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
// import Index from "../views/front/index";
// import postDetailView from "@/views/front/postDetailView";
// import postCreateView from "@/views/front/postCreateView";
// import communityView from "@/views/front/communityView";
// import myCommunityView from "@/views/front/myCommunityView";
// import myCreatedCommunityView from "@/views/front/myCreatedCommunityView";
// import communityCreateView from "@/views/front/communityCreateView";
// import communityManageView from "@/views/front/communityManageView";
// import userHomePage from "@/views/front/user/userHomePage";
// import login from "@/views/login/login";

const Index = () => import("../views/front/index");
const postDetailView = () => import("@/views/front/postDetailView");
const postCreateView = () => import("@/views/front/postCreateView");
const communityView = () => import("@/views/front/communityView");
const myCommunityView = () => import("@/views/front/myCommunityView");
const myCreatedCommunityView = () =>
  import("@/views/front/myCreatedCommunityView");
const communityCreateView = () => import("@/views/front/communityCreateView");
const communityManageView = () => import("@/views/front/communityManageView");
const userHomePage = () => import("@/views/front/user/userHomePage");
const login = () => import("@/views/login/login");

const postTable = () => import("../components/post/postTable");
const userTable = () => import("../components/sysUser/userTable");
const permsTable = () => import("../components/sysPerms/permsTable");
const IndexB = () => import("../views/back/index");
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/postDetail/:id",
    name: "postDetailView",
    component: postDetailView,
  },
  {
    path: "/postCreate",
    name: "postCreateView",
    component: postCreateView,
  },
  {
    path: "/community",
    name: "community",
    component: communityView,
  },
  {
    path: "/myCommunity/:name",
    name: "myCommunity",
    component: myCommunityView,
  },
  {
    path: "/myCreatedCommunity",
    name: "myCreatedCommunity",
    component: myCreatedCommunityView,
  },
  {
    path: "/communityManage/:name",
    name: "communityManage",
    component: communityManageView,
  },
  {
    path: "/createCommunity",
    name: "createCommunity",
    component: communityCreateView,
  },
  {
    path: "/userHome",
    name: "userHome",
    component: userHomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: login,
  },
  {
    path: "/back",
    name: "name",
    component: IndexB,
    children: [
      {
        path: "postTable/:status",
        component: postTable,
      },
      {
        path: "userTable/:enable",
        component: userTable,
      },
      {
        path: "permsTable",
        component: permsTable,
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
  },
  routes,
});

export default router;
