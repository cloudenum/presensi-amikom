<template>
  <form
    id="form-presensi"
    class="w-full font-sans space-y-4 text-black"
    @submit.prevent="submitForm"
  >
    <label class="block">
      <span class="text-gray-700">NIM</span>
      <input
        id="nim"
        v-model="nim"
        name="nim"
        class="transition-border-color duration-500 ease-linear mt-1 block w-full rounded-full bg-gray-200 focus:border-amikom focus:bg-white outline-none"
        placeholder="xx.xx.xxxx"
        type="text"
        pattern="\d{2}\.\d{2}\.\d{4}"
        required
      />
    </label>
    <!-- <label class="block">
      <span class="text-gray-700">Password</span>
      <input
        id="pass"
        v-model="pass"
        name="pass"
        class="transition-border-color duration-500 ease-linear mt-1 block w-full rounded-full bg-gray-200 focus:border-amikom focus:bg-white outline-none"
        type="password"
        placeholder="*****"
        pattern="\d{5}"
        required
      />
    </label> -->
    <label class="block">
      <span class="text-gray-700">Kode Presensi</span>
      <input
        id="code"
        v-model="code"
        name="code"
        class="transition-border-color duration-500 ease-linear mt-1 block w-full rounded-full bg-gray-200 focus:border-amikom focus:bg-white outline-none"
        type="text"
        placeholder="Kode presensi"
        pattern="[^_\W]{5}"
        required
      />
    </label>
    <div>
      <button
        :disabled="!code || !nim"
        type="submit"
        class="transition-background-color ease-linear duration-300 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
      >
        Presensi
      </button>
    </div>
  </form>
</template>

<script>
import CryptoJS from 'crypto-js'
import bodymovin from 'lottie-web'

function calculateSomethingFromDateWithFormat(nim) {
  const shortNim = nim.charAt(0) + nim.charAt(4) + nim.charAt(6) + nim.charAt(8)
  const dayDay = new Intl.DateTimeFormat('id', {
    day: '2-digit',
    hour12: false,
  }).format(new Date())

  const result = Number(dayDay) * Number(shortNim)
  const rawData = result.toString() + shortNim

  const length = rawData.length
  let sum = 0
  for (let i = 0; i < length; i++) {
    sum += Number(rawData.charAt(i))
  }

  return result + '-' + sum
}

export default {
  data() {
    return {
      nim: '',
      pass: '',
      code: '',
      securityKey: process.env.securityKey,
    }
  },
  methods: {
    submitForm() {
      // this.$swal.isLoading()
      this.$swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        allowEnterKey: false,
        showConfirmButton: false,
        background: 'rgba(0, 0, 0, 0)',
        backdrop: `
          rgba(20, 20, 20, 0.8)
          url("/animations/nyan-cat.gif")
          center
          no-repeat
        `,
      })
      // console.log(this.securityKey)
      const key = CryptoJS.enc.Hex.parse(this.securityKey)
      const timeData = calculateSomethingFromDateWithFormat(this.nim)
      const payload = this.code + ';' + this.nim + ';' + timeData
      // console.log(timeData)

      const encrypted = CryptoJS.TripleDES.encrypt(
        CryptoJS.enc.Utf8.parse(payload),
        key,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      )

      // const utf8 = CryptoJS.enc.Utf8.parse(encrypted.ciphertext)
      // const encryptedPayload = CryptoJS.enc.Base64.stringify(utf8)
      const encryptedPayload = encrypted.toString()
      // console.log(encryptedPayload)
      // await this.$axios
      //   .post(
      //     // 'http://202.91.9.14:6000/api/v1.2/presensi_mobile/validate_ticket',
      //     '/api/login',
      //     {
      //       nim: this.nim,
      //       pass: this.pass,
      //     }
      //   )
      //   .then((res) => {
      //     // this.$swal('Success', 'Login berhasil', 'success')
      //     console.log(res.data.access_token)

      //     if (res.status === 204) {
      //       this.$swal('Failed', 'Login gagal', 'warning')

      //       return
      //     }
      //   })
      //   .catch((error) => {
      //     // console.log(error.response.data)
      //     // const data = JSON.parse(error.response.data)
      //     // this.$swal('Failed', error.response.data.message, 'warning')
      //     this.$swal('Failed', error.response.data.Message, 'warning')
      //     console.log(error.response.status)
      //     console.log(error.response.data)
      //   })
      // console.log(this.$axios.defaults.baseURL)

      this.$on('attend-success', (data) => {
        // console.log(arg)
        this.$swal('Berhasil', data.message, 'success')
      })

      this.$on('attend-failed', (data) => {
        // console.log(data)
        if (data.slap) {
          this.$swal({
            html: `
              <div class="flex flex-col my-0 mx-auto">
                <div id="slap-anim" class="w-full"></div>
                <h4 class="w-full">${data.message}</h4>
              </div>
            `,
            willOpen(dom) {
              // console.log(dom)
              bodymovin.loadAnimation({
                container: document.querySelector('#slap-anim'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '/animations/kicking-cats.json',
              })
            },
          })
        } else {
          this.$swal('Gagal', data.message, data.type)
        }
      })

      this.$axios
        .post(
          // 'http://202.91.9.14:6000/api/v1.2/presensi_mobile/validate_ticket',
          '/api/presensi',
          {
            data: encryptedPayload,
          },
          {
            transformRequest: [
              function (data) {
                data = JSON.stringify(data)
                return data
              },
            ],
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          this.$emit('attend-success', { data: res.data })
          // this.$swal('Success', res.data.message, 'success')
          // console.log(res)
        })
        .catch((error) => {
          // console.log(error.response.data)
          if (error.response.status === 422) {
            this.$emit('attend-failed', {
              message: 'Sudah presensi!',
              type: 'warning',
              slap: true,
            })
            // this.$swal('Failed', 'Sudah presensi!', 'warning')
          } else {
            this.$emit('attend-failed', {
              message: 'Mungkin kode atau NIM salah.',
              type: 'error',
              slap: false,
            })
            // this.$swal('Failed', 'Presensi gagal!', 'warning')
          }
        })
    },
  },
}
</script>
