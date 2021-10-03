import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'
import Tag from '../views/Tag.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:id/:token',
    name: 'Details',
    component: Details,
    props: true
  },
  {
    path: '/posts/create/:token',
    name: 'Create',
    component: Create,
    props: true
  },
  {
    // /:token
    path: '/posts/tags/:tag/:token',
    name: 'Tag',
    component: Tag,
    // props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
