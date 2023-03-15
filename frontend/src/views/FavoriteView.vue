<template>
  <div>
    <b-container
      id="my-table"
      fluid="xl"
      class="py-3 px-0 d-flex flex-wrap justify-content-center align-items-stretch border border-top-0"
    >
      <div class="my-5 text-center" v-if="!favorites.length">
        <h3 class="mb-3">Favorites is empty</h3>
        <b-link :to="{ name: 'home' }" class="text-decoration-none text-dark"
          ><h6>
            Click Here to Continue Shopping
            <b-icon class="ml-2" icon="shop"></b-icon></h6
        ></b-link>
      </div>
      <ProductCard
        v-for="(pro, index) in favorites"
        :key="index"
        :product="pro"
      ></ProductCard>
    </b-container>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ProductCard,
  },
  computed: {
    ...mapState(['favorites']),
  },
}
</script>

<style scoped>
.containerStyle h1,
h2,
h3,
h4,
h5 {
  font-family: Impact, Haettenschweiler, 'Arial Narrow', sans-serif;
}
</style>
