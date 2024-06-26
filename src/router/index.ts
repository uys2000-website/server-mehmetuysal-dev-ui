import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AboutView",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "LoginView",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/home",
      name: "HomeLayout",
      component: () => import("../layouts/HomeLayout.vue"),
      children: [
        {
          path: "settings",
          name: "SettingsView",
          component: () => import("../views/SettingsView.vue"),
        },
        {
          path: "scripts",
          name: "ScriptsView",
          component: () => import("../views/ScriptsView.vue"),
        },
        {
          path: "projects",
          name: "ProjectsView",
          component: () => import("../views/ProjectsView.vue"),
        },
        {
          path: "startup",
          name: "StartupView",
          component: () => import("../views/StartupView.vue"),
        },
        {
          path: "logs",
          name: "LogsView",
          component: () => import("../views/LogsView.vue"),
        },
      ],
    },
  ],
});

export default router;
