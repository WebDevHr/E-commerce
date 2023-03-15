<template>
  <div
    class="d-flex justify-content-center align-items-center flex-wrap flex-column"
  >
    <b-container
      id="my-table"
      fluid="xl"
      class="py-3 px-0 d-flex flex-wrap justify-content-center align-items-stretch border border-top-0"
    >
      <div class="py-5 text-center" v-if="!cart.length">
        <h3 class="mb-3">Cart is empty</h3>
        <b-link :to="{ name: 'home' }" class="text-decoration-none text-dark"
          ><h6>
            Click Here to Continue Shopping
            <b-icon class="ml-2" icon="shop"></b-icon></h6
        ></b-link>
      </div>
      <div
        class="card mb-3 col-sm-12"
        style="max-width: 70rem"
        v-for="(item, index) in sortedCart"
        :key="index"
      >
        <div class="row">
          <div class="col-sm-2 p-0 makeCenter">
            <img
              :src="item.product.image"
              class="img-fluid rounded-start my-2"
              :alt="item.product.title"
              style="max-width: 5rem"
            />
          </div>
          <div class="col-sm-5 makeCenter">
            <div>
              <h5>{{ item.product.title }}</h5>
            </div>
          </div>
          <div
            class="col-sm-3 btn-group makeCenter"
            role="group"
            aria-label="Basic example"
          >
            <BaseButton
              :disabled="item.count <= 1"
              buttonClass="-fill-gray"
              @click="removeFromCart(item.product)"
              style="width: 2rem"
            >
              -
            </BaseButton>

            <input
              type="text"
              class="rounded px-2 mx-1"
              v-model="item.count"
              style="width: 3rem; text-align: center; height: 2.6rem"
            />

            <BaseButton
              buttonClass="-fill-gray"
              @click="addToCart(item.product)"
              style="width: 2rem"
            >
              +
            </BaseButton>
          </div>
          <div class="col-sm-1 makeCenter">
            <b>${{ item.product.price * item.count }}</b>
          </div>
          <div class="col-sm-1 makeCenter">
            <button
              class="border-0 bg-transparent"
              @click="removeAllProduct(item.product)"
            >
              <b-icon
                icon="trash"
                variant="danger"
                style="width: 1.5rem; height: 1.5rem"
              ></b-icon>
            </button>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    sortedCart() {
      return this.makeSetOfCart()
    },
    ...mapState(['cart']),
  },
  methods: {
    makeSetOfCart() {
      let editedCart = []
      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index)
      }
      let cart = this.cart
      let setOfCart = removeDuplicates(cart)
      let eachLen
      for (let i = 0; i < setOfCart.length; i++) {
        eachLen = cart.filter((x) => x.id == setOfCart[i].id).length
        editedCart.push({ product: setOfCart[i], count: eachLen })
      }
      return editedCart
    },
    ...mapActions(['addToCart', 'removeFromCart', 'removeAllProduct']),
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
.makeCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
