import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import RenderView from '@/components/RenderView.vue'
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import Forbidden from "../views/403";
import { check, isLogin } from "../utils/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    component: () => import ('@/components/layout/UserLayout'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/Login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '../views/User/Register.vue')
      }
    ]
  },
  {
    path: "/",
    meta: {authority: ['user', 'admin']},
    component: () =>
        import(/* webpackChunkName: "layout" */ "@/components/layout/BasicLayout"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
                import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis")
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ['admin']},
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
                import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
                import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                    import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                    import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2")
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                    import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3")
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    hideInMenu: true,
    component: NotFound
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。"
      });
      next({
        path: "/403"
      });
    }
  }

  next();
});

export default router
