import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
// import store from '../store'

const routes = [

  {
    path: '/',
    name: 'Admin',
    component: Admin,
    // meta: {
    //   requiresAdmin: true
    // }
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

// router.beforeEach(async (to, from, next) => {
//   const token = store.state.Token.token;

//   if (!token) {
//     window.location = "/login";
//   } else {
//     const isAdmin = true;
//     const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

//     if (requiresAdmin && !isAdmin) next({ name: 'Login' });
//     else next();
//   }
// })

export default router
