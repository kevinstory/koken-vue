import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from "../stores/user";

import AppHome from "../views/AppHome.vue";
import AppPhoto from "../views/AppPhoto.vue";
import AuthLogin from "../views/auth/AuthLogin.vue";
import AuthRegister from "../views/auth/AuthRegister.vue";
import AuthReset from "../views/auth/AuthReset.vue";
import AdminSettings from "../views/admin/AdminSettings.vue";
import AdminView from "../views/admin/AdminView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/home",
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/home",
      name: "home",
      component: AppHome,
      meta: {
        requiresAuth: false,
      },
      meta: {
        scrollPos: {
          top: 0,
          left: 0,
        },
      },
    },
    {
      path: "/photo/:id",
      name: "photo",
      component: AppPhoto,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/auth/login",
      name: "login",
      component: AuthLogin,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/auth/register",
      name: "register",
      component: AuthRegister,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/auth/reset",
      name: "reset",
      component: AuthReset,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: AdminSettings,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ x: 0, y: 0 })
        }
      }, 250)
    })
  },
})

router.beforeEach(async (to, from, next) => {
  const store = await userStore();
  //console.log('window.scrollY:', window.scrollY)
  from.meta?.scrollTop && (from.meta.scrollTop = window.scrollY)
  if (to.meta.requiresAuth) {
    if (store.isAdmin) {
      next();
      return;
    }
    next("/auth/login");
  } else {
    next();
  }
});
export default router
