import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductView from '../views/ProductView.vue'
import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category/:category',
      name: 'category',
      component: CategoryView,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.state.categ = routeTo.params.category
        next()
      },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('getProduct', routeTo.params.id)
          .then(() => {
            next()
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            }
          })
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    },
    {
      path: '/Sign In',
      name: 'signin',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/SigninView.vue'),
    },
    {
      path: '/Sign Up',
      name: 'signup',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/SignupView.vue'),
    },
    {
      path: '/Profile',
      name: 'profile',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
    },
    {
      path: '/Orders',
      name: 'orders',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/OrdersView.vue'),
    },
    {
      path: '/Cart',
      name: 'cart',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/CartView.vue'),
    },
    {
      path: '/Favorites',
      name: 'favorites',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/FavoriteView.vue'),
    },
    {
      path: '/Rates',
      name: 'ratings',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/RatesView.vue'),
    },
    {
      path: '/Sign Out',
      redirect: { name: 'home' },
    },
    {
      path: '/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
      props: true,
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ],
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
