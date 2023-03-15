<template>
  <div>
    <b-nav-item-dropdown no-caret class="mr-2">
      <!-- Using 'button-content' slot -->
      <template #button-content>
        <div><b-icon icon="person-check"></b-icon>Account</div>
      </template>
      <b-dropdown-item
        v-for="(accountItem, index) in accountItems"
        :key="index"
        @click="dropDownLink(accountItem)"
      >
        {{ accountItem }}
      </b-dropdown-item>
      <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
      <b-dropdown-item> </b-dropdown-item>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountItems: ['Orders', 'Ratings', 'Profile'],
      currentItem: null,
    }
  },
  methods: {
    dropDownLink(item) {
      if (this.currentItem != item) {
        this.currentItem = item
        item = item.toLowerCase().replace(' ', '')
        this.$router.push({ name: item })
      }
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped></style>
