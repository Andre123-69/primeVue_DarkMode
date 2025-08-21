import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("../modules/Home/Home.vue"),
    },
    {
      path: "/productos",
      name: "Productos",
      component: () => import("../modules/Productos/Productos.vue"),
    },
    {
      path: "/debe-pagos",
      name: "Debe-pagos",
      component: () => import("../modules/Home/Debe-deudas.vue"),
    },
    {
      path: "/portal",
      name: "Portal",
      component: () => import("../modules/portal/portal.vue"),
      meta: { noLayout: true }
    },
  ],
});

export default router;