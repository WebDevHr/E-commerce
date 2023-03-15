<template>
  <div id="app">
    <NavBar v-if="!isNotFound"></NavBar>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
  computed: {
    isNotFound() {
      return this.$route.fullPath == '/404'
    },
  },
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: 550;
  color: #2c3e50;
}
input:focus {
  outline: 0;
}

nav a.router-link-exact-active {
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
}
</style>
