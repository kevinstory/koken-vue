import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from "../stores/user";

import AppHome from "../views/AppHome.vue";
import AppPhoto from "../views/AppPhoto.vue";
import AuthLogin from "../views/auth/AuthLogin.vue";
import AuthRegister from "../views/auth/AuthRegister.vue";
import AuthReset from "../views/auth/AuthReset.vue";
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
  ]
})

router.beforeEach(async (to, _from, next) => {
  const store = await userStore();
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
