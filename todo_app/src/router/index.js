import Vue from 'vue'
import VueRouter from 'vue-router'
import AddTodo from '../components/AddTodo.vue'
import Todos from '../components/Todos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/add',
    name: 'AddTodo',
    component: AddTodo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
