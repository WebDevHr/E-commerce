<template>
  <div class="home">
    <b-container
      id="my-table"
      fluid="xl"
      class="py-3 px-0 d-flex flex-wrap justify-content-center align-items-stretch border border-top-0"
    >
      <ProductCard
        v-for="(pro, index) in products"
        :key="index"
        :product="pro"
      ></ProductCard>
    </b-container>
    <b-container class="d-flex justify-content-center my-5">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalProducts"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import store from '@/store'
import { mapState } from 'vuex'

function getPageProducts(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store.dispatch('getCat')
  store
    .dispatch('fetchByCategory', {
      category: store.state.categ,
      page: currentPage,
    })
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    category: String,
  },
  data() {
    return {
      currentPage: this.$route.query.page || 1,
    }
  },
  components: {
    ProductCard,
  },
  methods: {
    getProducts() {
      this.$store.dispatch('getProduct', 2)
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$router.push({ name: 'category', query: { page: newValue } })
      }
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageProducts(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageProducts(routeTo, next)
  },
  computed: {
    ...mapState(['products', 'perPage', 'totalProducts']),
  },
}
</script>

<style scoped></style>
