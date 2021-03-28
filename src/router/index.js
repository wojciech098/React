import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Courses from "../views/Courses";
import Exams from "../views/Exams";
import NotPassed from "../views/NotPassed";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/exams',
    name: 'Exams',
    component: Exams
  },
  {
    path: '/not-passed-exams',
    name: 'NotPassedExams',
    component: NotPassed
  }
]

const router = new VueRouter({
  routes
})

export default router
