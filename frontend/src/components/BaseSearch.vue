<template>
  <div>
    <input type="text" v-model="searchTerm" @input="search" />
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.id">{{ result.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      results: [],
    }
  },
  methods: {
    async search() {
      //   const response = await axios.get(
      //     `https://my-api.com/search?q=${this.searchTerm}`
      //   )
      //   this.results = response.data
    },
  },
}
</script>
