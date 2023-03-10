import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4cc4cbd2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _66303c5e = () => interopDefault(import('../pages/list/index.vue' /* webpackChunkName: "pages/list/index" */))
const _166c6ee9 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _4db0b8e1 = () => interopDefault(import('../pages/color/_slug/index.vue' /* webpackChunkName: "pages/color/_slug/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/en/",
    component: _4cc4cbd2,
    pathToRegexpOptions: {"strict":true},
    name: "index___en"
  }, {
    path: "/es/",
    component: _4cc4cbd2,
    pathToRegexpOptions: {"strict":true},
    name: "index___es"
  }, {
    path: "/pt/",
    component: _4cc4cbd2,
    pathToRegexpOptions: {"strict":true},
    name: "index___pt"
  }, {
    path: "/en/color-list/",
    component: _66303c5e,
    pathToRegexpOptions: {"strict":true},
    name: "list___en"
  }, {
    path: "/en/login/",
    component: _166c6ee9,
    pathToRegexpOptions: {"strict":true},
    name: "login___en"
  }, {
    path: "/es/listado-colores/",
    component: _66303c5e,
    pathToRegexpOptions: {"strict":true},
    name: "list___es"
  }, {
    path: "/es/login/",
    component: _166c6ee9,
    pathToRegexpOptions: {"strict":true},
    name: "login___es"
  }, {
    path: "/pt/lista-cores/",
    component: _66303c5e,
    pathToRegexpOptions: {"strict":true},
    name: "list___pt"
  }, {
    path: "/pt/login/",
    component: _166c6ee9,
    pathToRegexpOptions: {"strict":true},
    name: "login___pt"
  }, {
    path: "/en/:slug/",
    component: _4db0b8e1,
    pathToRegexpOptions: {"strict":true},
    name: "color-slug___en"
  }, {
    path: "/es/:slug/",
    component: _4db0b8e1,
    pathToRegexpOptions: {"strict":true},
    name: "color-slug___es"
  }, {
    path: "/pt/:slug/",
    component: _4db0b8e1,
    pathToRegexpOptions: {"strict":true},
    name: "color-slug___pt"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
