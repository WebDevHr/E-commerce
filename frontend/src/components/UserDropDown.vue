<template>
  <div>
    <b-nav-item-dropdown no-caret class="mr-2">
      <!-- Using 'button-content' slot -->
      <template #button-content>
        <div><b-icon icon="person-fill"></b-icon> {{ userItems[0] }}</div>
      </template>
      <b-dropdown-item
        v-for="(userItem, index) in userItems[1]"
        :key="index"
        @click="dropDownLink(userItem)"
      >
        {{ userItem }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentItem: null,
    }
  },
  props: {
    userItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    dropDownLink(item) {
      if (this.currentItem != item) {
        this.currentItem = item
        item = item.toLowerCase().replace(' ', '')
        this.$router.push({ name: item })
      }
    },
  },
}
</script>

<style scoped></style>
