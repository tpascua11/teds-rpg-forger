import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  /*
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  */
  {
    path: '',
    name: 'Area',
    component: () => import ('../views/Area.vue'),
    prop: {
      world: Object
    }
  },
  {
    path: '/betterArea',
    name: 'Area',
    component: () => import ('../views/Area.vue'),
    prop: {
      world: Object
    }
  },
  {
    path: '/area',
    name: 'AreaBuilder',
    component: () => import ('../views/AreaBuilder.vue'),
    prop: {
      world: Object
    }
  },
  {
    path: '/testing',
    name: 'TestingZone',
    component: () => import ('../views/TestingZone.vue'),
    prop: {
      world: Object
    }
  },

  {
    path: '/world',
    name: 'World',
    component: () => import ('../views/World.vue'),
    prop: {
      world: Object
    }
  },

  {
    path: '/item',
    name: 'Item',
    component: () => import ('../views/Item.vue'),
    prop: {
      world: Object
    }
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
