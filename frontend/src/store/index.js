import Vue from 'vue'
import Vuex from 'vuex'
import MainService from '@/services/MainService.js'
import * as auth from '@/store/modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
  },
  state: {
    isSignedIn: false,
    signForm: null,
    categories: [],
    product: {},
    products: [],
    page: 1,
    perPage: 8,
    totalProducts: null,
    categ: null,
    favorites: [],
    cart: [],
    search: null,
  },
  getters: {},
  mutations: {
    // SET_ISSIGNEDIN() {
    //   this.isSignedIn = !this.isSignedIn
    // },
    SET_CATEGORIES(state, event) {
      state.categories = event
    },
    SET_PRODUCT(state, product) {
      state.product = product
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_PRODUCTS_TOTAL(state, NumOfProducts) {
      state.totalProducts = NumOfProducts
    },
    SET_CATEGORYSELECTED(state, value) {
      state.categorySelected = value
    },
    ADD_FAVORITE(state, product) {
      state.favorites.push(product)
    },
    REMOVE_FAVORITE(state, index) {
      state.favorites.splice(index, 1)
    },
    ADD_CART(state, product) {
      state.cart.push(product)
    },
    REMOVE_CART(state, index) {
      state.cart.splice(index, 1)
    },
  },
  actions: {
    getCat({ commit }) {
      return MainService.getCategories()
        .then((res) => {
          commit('SET_CATEGORIES', res.data)
        })
        .catch((err) => {
          console.log('error: ', err)
        })
    },
    getProduct({ commit }, id) {
      return MainService.getProduct(id).then((res) => {
        commit('SET_PRODUCT', res.data)
      })
    },
    fetchProducts({ commit, state }, { page }) {
      return MainService.getProducts(state.perPage, page)
        .then((res) => {
          commit('SET_PRODUCTS_TOTAL', parseInt(res.headers['x-total-count']))
          commit('SET_PRODUCTS', res.data)
        })
        .catch((err) => console.log(err))
    },
    fetchByCategory({ commit, state }, { category, page }) {
      return MainService.getProductsByCat(category, state.perPage, page)
        .then((res) => {
          commit('SET_PRODUCTS_TOTAL', parseInt(res.headers['x-total-count']))
          commit('SET_PRODUCTS', res.data)
        })
        .catch((err) => console.log(err))
    },
    toggleFavorite({ commit, state }, product) {
      let favorites = state.favorites
      let favoriteIndex = -1
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id == product.id) {
          favoriteIndex = i
        }
      }
      if (favoriteIndex == -1) {
        commit('ADD_FAVORITE', product)
        return 'red'
      } else {
        commit('REMOVE_FAVORITE', favoriteIndex)
        return 'grey'
      }
    },
    addToCart({ commit }, product) {
      commit('ADD_CART', product)
    },
    removeFromCart({ commit, state }, product) {
      const cartItem = state.cart.findIndex((x) => x == product)
      if (cartItem != -1) {
        commit('REMOVE_CART', cartItem)
      }
    },
    howManyPro(product) {
      const count = this.state.cart.filter((item) => item == product).length
      return count
    },
    removeAllProduct({ commit, state }, product) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i] == product) {
          let index = state.cart.findIndex((x) => x == product)
          commit('REMOVE_CART', index)
          i--
        }
      }
    },
    fetchSearchBox({ state }, searchExpression) {
      state.search = searchExpression
      return MainService.getSearch({
        searchExpression,
      })
    },
  },
})
