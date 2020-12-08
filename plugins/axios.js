console.log(process.env.baseUrl)
export default function ({ $axios, redirect }) {
  $axios.defaults.baseURL = process.env.baseURL
}
