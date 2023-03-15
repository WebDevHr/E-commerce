<!--<template>
  <div>
    <b-nav-form class="mr-5">
      <b-input-group class="position-relative" style="width: 475px">
        <b-form-input
          class="rounded shadow-none focusInput"
          size="md"
          placeholder="Search Your Product"
          v-model="searchExpression"
          @input="search"
        ></b-form-input>
        <b-button
          size="sm"
          class="my-2 my-sm-0 bg-transparent border-0 position-absolute shadow-none"
          style="right: 0; top: 12%; z-index: 100"
        >
          <b-icon icon="search" class="text-secondary"></b-icon>
        </b-button>
      </b-input-group>
    </b-nav-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: null,
    }
  },
  computed: {
    updatedInput() {
      return this.$emit('input', this.searchValue)
    },
  },
}
</script>

<style scoped>
.focusInput {
  border: none;
  background-color: #ececec;
}
.focusInput:focus {
  background-color: white;
  border: 1px solid #ececec;
}
</style>
-->

<template>
  <div style="position: relative">
    <b-nav-form class="mr-5">
      <b-input-group class="position-relative" style="width: 475px">
        <b-form-input
          class="rounded shadow-none focusInput"
          size="md"
          placeholder="Search Your Product ... "
          v-model="searchExpression"
          @input="search"
        ></b-form-input>
        <b-button
          size="sm"
          class="my-2 my-sm-0 bg-transparent border-0 position-absolute shadow-none"
          style="right: 0; top: 12%; z-index: 100"
        >
          <b-icon icon="search" class="text-secondary"></b-icon>
        </b-button>
      </b-input-group>
      <ul
        v-if="results.length > 0 && searchExpression != ''"
        v-bind:class="{ searchList: results }"
      >
        <li
          v-for="record in results"
          :key="record._id"
          @click="searchedItem(record)"
          class="searchedItemsStyle"
        >
          {{ record.title }}
        </li>
      </ul>
    </b-nav-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      searchExpression: '',
      results: [],
    }
  },
  methods: {
    async search() {
      if (!this.searchExpression) {
        this.results = []
        return
      }
      const { data } = await this.fetchSearchBox(this.searchExpression)
      // const { data } = await axios.get('http://localhost:8082/search', {
      //   params: {
      //     q: this.searchExpression,
      //   },
      // })
      this.results = data
    },
    searchedItem(record) {
      this.$router.push({ name: 'product', params: { id: record.id } })
      this.searchExpression = ''
    },
    ...mapActions(['fetchSearchBox']),
  },
}
</script>

<style scoped>
.focusInput {
  background-color: #ececec;
}
.focusInput:focus {
  background-color: white;
  border: 1px solid #ececec;
}
.searchList {
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 1000;
  background-color: white;
  border-radius: 5px;
  width: 475px;
  border: 1px solid grey;
}
.searchedItemsStyle {
  text-decoration: none;
  list-style: none;
  cursor: pointer;
}
</style>
