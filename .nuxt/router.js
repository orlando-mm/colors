import Vue from 'vue';
import Router from 'vue-router';
import { normalizeURL, decode } from 'ufo';
import { interopDefault } from './utils';
import scrollBehavior from './router.scrollBehavior.js';

const _600fe44a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */));
const _14851264 = () =>
  interopDefault(import('..\\pages\\aboutus\\index.vue' /* webpackChunkName: "pages/aboutus/index" */));
const _ccc09e1c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */));

const emptyFn = () => {};

Vue.use(Router);

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [
    {
      path: '/en',
      component: _600fe44a,
      name: 'index___en'
    },
    {
      path: '/es',
      component: _600fe44a,
      name: 'index___es'
    },
    {
      path: '/en/about-us',
      component: _14851264,
      name: 'aboutus___en'
    },
    {
      path: '/en/login',
      component: _ccc09e1c,
      name: 'login___en'
    },
    {
      path: '/es/login',
      component: _ccc09e1c,
      name: 'login___es'
    },
    {
      path: '/es/quienes-somos',
      component: _14851264,
      name: 'aboutus___es'
    }
  ],

  fallback: false
};

export function createRouter(ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base;
  const router = new Router({ ...routerOptions, base });

  // TODO: remove in Nuxt 3
  const originalPush = router.push;
  router.push = function push(location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort);
  };

  const resolve = router.resolve.bind(router);
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to);
    }
    return resolve(to, current, append);
  };

  return router;
}
