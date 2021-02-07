import { createWebHistory, createRouter } from "vue-router";
import Main from "@/components/Main.vue";
import Time from "@/components/Time.vue";

const routes = [
  {
    path: "/time",
    name: "Time",
    component: Time,
  },
  {
    path: "/",
    name: "Main",
    component: Main,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
