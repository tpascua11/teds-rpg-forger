import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/betterArea',
    name: 'Area',
    component: () => import ('../views/Area.vue'),
    prop: {
      world: Object
    }
  },

  {
    path: '/stat',
    name: 'Stat',
    component: () => import ('../views/Stat.vue'),
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
    path: '/global',
    name: 'Global',
    component: () => import ('../views/Global.vue'),
    prop: {
      world: Object
    }
  },

  {
    path: '/testing',
    name: 'Testing',
    component: () => import ('../views/TestingZone.vue'),
    prop: {
      world: Object
    }
  },


  {
    path: '/common',
    name: 'Common',
    component: () => import ('../views/CommonEvent.vue'),
    prop: {
      world: Object
    }
  },

  {
    path: '/character',
    name: 'Character',
    component: () => import ('../views/Character.vue'),
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
