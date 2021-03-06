import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import VueCookies from "vue-cookies";

const routes = [

  {
    path: '/',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = VueCookies.get("adminToken");
  if (to.name !== 'Login' && (!token || token === 'null')) next({ name: 'Login' })
  else next()
})


export default router
