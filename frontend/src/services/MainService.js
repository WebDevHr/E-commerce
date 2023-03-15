import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8082`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// const eCommerceApi = axios.create({
//   baseURL: `https://fakestoreapi.com`,
//   withCredentials: false, // This is the default
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// })

export default {
  getCategories() {
    return apiClient.get('/products/categories')
  },
  getProduct(id) {
    return apiClient.get('/products/product/' + id)
  },
  getProducts(perPage, page) {
    return apiClient.get('/products?_limit=' + perPage + '&_page=' + page)
  },
  getProductsByCat(category, perPage, page) {
    return apiClient.get(
      '/products/' + category + '?_limit=' + perPage + '&_page=' + page
    )
  },
  getSearch(expression) {
    return apiClient.get('/search', {
      params: {
        q: expression,
      },
    })
  },
}
