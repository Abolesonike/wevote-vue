import { createRouter, createWebHistory } from "vue-router";
// import { createRouter, createWebHashHistory } from "vue-router";
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
const Frame = () => import("../views/front/frame");
const Index = () => import("../views/front/index");
const searchView = () => import("../views/front/searchView");
const postDetailView = () => import("@/views/front/postDetailView");
const postCreateView = () => import("@/views/front/postCreateView");
const postUpdateView = () => import("@/views/front/postUpdateView");
const communityView = () => import("@/views/front/communityView");
const myCommunityView = () => import("@/views/front/myCommunityView");
const myCreatedCommunityView = () =>
  import("@/views/front/myCreatedCommunityView");
const communityCreateView = () => import("@/views/front/communityCreateView");
const communityManageView = () => import("@/views/front/communityManageView");
const userHomePage = () => import("@/views/front/user/userHomePage");
const login = () => import("@/views/login/login");
const findPassword = () => import("@/views/login/findPassword");
const signIn = () => import("@/views/login/signIn");

const postTable = () => import("../components/back/post/postTable");
const userTable = () => import("../components/back/sysUser/userTable");
const communityTable = () =>
  import("../components/back/community/communityTable");
const classification = () =>
  import("../components/back/community/classification");
const permsTable = () => import("../components/back/sysPerms/permsTable");
const roleTable = () => import("../components/back/sysRole/roleTable");
const commentTable = () => import("../components/back/comment/commentTable");
const IndexB = () => import("../views/back/index");
const routes = [
  {
    path: "/",
    name: "Frame",
    component: Frame,
    children: [
      {
        path: "/index",
        name: "Index",
        component: Index,
      },
      {
        path: "/search/:keyword",
        name: "searchView",
        component: searchView,
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
        path: "/postUpdate/:id",
        name: "postUpdateView",
        component: postUpdateView,
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
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: login,
  },
  {
    path: "/findPassword",
    name: "findPassword",
    component: findPassword,
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: signIn,
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
        path: "communityTable/:status",
        component: communityTable,
      },
      {
        path: "classification",
        component: classification,
      },
      {
        path: "permsTable",
        component: permsTable,
      },
      {
        path: "roleTable",
        component: roleTable,
      },
      {
        path: "commentTable/:status",
        component: commentTable,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
