export default function ({ $axios, redirect }) {
  $axios.defaults.baseUrl = process.env.baseUrl
}
