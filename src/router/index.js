import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue'),
  },
  {
    path: '/edit-movie/:id',
    name: 'EditMovie',
    component: () => import(/* webpackChunkName: "edit-movie" */ '../views/EditMovie.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
