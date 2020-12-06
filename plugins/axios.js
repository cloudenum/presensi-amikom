export default async ({ app, $axios }) => {
  $axios.defaults.withCredentials = true
  $axios.defaults.mode = 'no-cors'

  $axios.onError((error) => {
    console.warn('onError', error)
    app.$swal('Error', error.message, 'error')
  })
}
