import AuthService from '@/services/AuthService.js'

export const namespaced = true

export const state = {
  user: null,
  isNewUser: true,
}

export const mutations = {
  SET_USER_DATA(state, userData) {
    localStorage.setItem('user', JSON.stringify(userData))
    AuthService.setAuthHeader(userData)
    state.user = userData
  },
  LOGOUT() {
    localStorage.removeItem('user')
    state.user = null
  },
  IS_NEW_USER(state, isNewUser) {
    state.isNewUser = isNewUser
  },
}

export const actions = {
  register({ commit }, credentials) {
    return AuthService.register(credentials).then(({ data }) => {
      commit('SET_USER_DATA', data)
    })
  },
  login({ commit }, credentials) {
    return AuthService.login(credentials).then(({ data }) => {
      commit('SET_USER_DATA', data)
    })
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  isNewUser({ commit }, isNewUser) {
    commit('IS_NEW_USER', isNewUser)
  },
}
