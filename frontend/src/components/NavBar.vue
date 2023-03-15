<template>
  <div>
    <b-container fluid="xl" class="p-0">
      <b-navbar toggleable="lg">
        <b-navbar-brand :to="{ name: 'home' }">
          <b-navbar-brand tag="h1">E-Commerce</b-navbar-brand>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <SearchBar v-model="searchValue" />

            <b-navbar-nav>
              <template v-if="!user">
                <UserDropDown :userItems="signedIn" />
              </template>
              <template v-else>
                <AccountDropDown />
              </template>

              <b-nav-item :to="{ name: 'favorites' }" class="mr-2"
                ><b-icon icon="suit-heart"></b-icon> Favorite</b-nav-item
              >
              <b-nav-item :to="{ name: 'cart' }">
                <b-icon icon="cart"></b-icon>
                Cart
                <b-badge variant="secondary">{{ cartLength }}</b-badge>
              </b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <b-container fluid="xl" class="p-0">
      <b-nav tabs align="center">
        <b-nav-item
          v-for="(category, index) in categories"
          :key="index"
          @click="showCat(category)"
          :active="cat == category"
          >{{ category | upFirst }}</b-nav-item
        >
      </b-nav>
    </b-container>
  </div>
</template>

<script>
import upperFirst from 'lodash/upperFirst'
import UserDropDown from '@/components/UserDropDown.vue'
import SearchBar from '@/components/SearchBar.vue'
import AccountDropDown from '@/components/AccountDropDown.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    UserDropDown,
    SearchBar,
    AccountDropDown,
  },
  data() {
    return {
      signedStatusItems: {
        User: ['Profile', 'Orders', 'Rates', 'Sign Out'],
        Login: ['Sign In', 'Sign Up'],
      },
      searchValue: null,
      cat: null,
    }
  },
  computed: {
    signedIn() {
      return this.$store.state.isSignedIn
        ? Object.entries(this.signedStatusItems)[0]
        : Object.entries(this.signedStatusItems)[1]
    },
    cartLength() {
      return this.cart.length
    },
    user() {
      return this.$store.state.auth.user
        ? this.$store.state.auth.user
        : localStorage.getItem('user')
    },
    ...mapState(['categories', 'cart']),
  },
  filters: {
    upFirst(value) {
      return upperFirst(value)
    },
  },
  methods: {
    showCat(cat) {
      this.cat = cat
      this.$store.state.categ = cat
      this.fetchByCategory({ category: cat, page: 1 })
      this.$router
        .push({ name: 'category', params: { category: cat } })
        .catch(() => {})
    },
    ...mapActions(['fetchByCategory']),
  },
}
</script>

<style scoped>
.nav-link {
  color: grey;
}
</style>
