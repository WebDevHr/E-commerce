<template>
  <div
    class="card position-relative d-flex justify-content-between cart-style m-2"
  >
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton-img
            class="card-img-top image-style"
            animation="throb"
          ></b-skeleton-img>
          <b-skeleton
            class="card-body overflow-hidden mt-3"
            style="height: 5.1rem"
            animation="throb"
          ></b-skeleton>
          <b-skeleton animation="throb"></b-skeleton>
          <b-skeleton animation="throb"></b-skeleton>
          <div class="d-flex justify-content-center">
            <b-skeleton animation="throb" type="button"></b-skeleton>
          </div>
        </b-card>
      </template>

      <button
        class="position-absolute start-100 favorite-but bg-transparent border rounded-circle p-0"
        @click="toggleFav(product)"
      >
        <BaseIcon
          name="heart"
          class="p-1"
          :style="{ color: colorOfFav }"
        ></BaseIcon>
      </button>
      <img
        :src="product.image"
        class="card-img-top image-style"
        :alt="product.title"
      />
      <div class="card-body overflow-hidden" style="height: 5.1rem">
        <h6 class="card-title">{{ product.title }}</h6>
      </div>

      <div class="d-flex align-items-center">
        <b-form-rating
          v-model="valueOfRate"
          readonly
          class="border-0 bg-transparent"
          style="width: 10rem"
        ></b-form-rating>
        ({{ product.rating.count }})
      </div>
      <div class="card-body py-0 price-font">${{ product.price }}</div>
      <b-link :to="{ name: 'product', params: { id: product.id } }">
        <div class="card-body">
          <BaseButton buttonClass="-fill-gray">Go to Details</BaseButton>
        </div>
      </b-link>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 1,
    }
  },
  watch: {
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval()

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime++
          }, 1000)
        }
      }
    },
    loadingTime(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === this.maxLoadingTime) {
          this.loading = false
        }
      }
    },
  },
  created() {
    this.$_loadingTimeInterval = null
  },
  mounted() {
    this.startLoading()
  },
  props: {
    product: {
      type: Object,
      requierd: true,
    },
  },
  computed: {
    valueOfRate() {
      return this.product.rating.rate
    },
    colorOfFav() {
      let favorites = this.$store.state.favorites
      let product = this.product
      let flag = 0
      for (let i = 0; i < favorites.length; i++) {
        if (product.id == favorites[i].id) {
          flag = 1
          break
        }
      }
      return flag ? 'red' : 'grey'
    },
    // ...mapState(['favorites']),
  },
  methods: {
    toggleFav(product) {
      this.toggleFavorite(product)
    },
    clearLoadingTimeInterval() {
      clearInterval(this.$_loadingTimeInterval)
      this.$_loadingTimeInterval = null
    },
    startLoading() {
      this.loading = true
      this.loadingTime = 0
    },
    ...mapActions(['toggleFavorite']),
  },
  // watch: {
  //   color(newValue, oldValue) {
  //     if (newValue != oldValue) {

  //     }
  //   },
  // },
}
</script>

<style scoped>
.favorite-but {
  z-index: 10;
  right: 5%;
  top: 3%;
}
.cart-style {
  width: 16.5rem;
}
.image-style {
  margin-left: auto;
  margin-right: auto;
  height: 12rem;
  width: 10rem;
  margin-top: 15px;
}
.price-font {
  font-weight: 700;
}
a:hover {
  text-decoration: none;
}
.activeFav {
  color: red;
}
</style>
