<template>
  <form
    id="form-presensi"
    class="w-full font-sans space-y-4"
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
        pattern="\\d{2}\\.\\d{2}.\\d{4}"
        required
      />
    </label>
    <label class="block">
      <span class="text-gray-700">Password</span>
      <input
        id="pass"
        v-model="pass"
        name="pass"
        class="transition-border-color duration-500 ease-linear mt-1 block w-full rounded-full bg-gray-200 focus:border-amikom focus:bg-white outline-none"
        type="password"
        placeholder="*****"
        pattern="\\d{5}"
        required
      />
    </label>
    <label class="block">
      <span class="text-gray-700">Kode Presensi</span>
      <input
        id="code"
        v-model="code"
        name="code"
        class="transition-border-color duration-500 ease-linear mt-1 block w-full rounded-full bg-gray-200 focus:border-amikom focus:bg-white outline-none"
        type="text"
        placeholder="Kode presensi"
        pattern="[^_\\W]{6}"
        required
      />
    </label>
    <div>
      <button
        class="transition-background-color ease-linear duration-300 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
      >
        Presensi
      </button>
      {{ nim }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nim: '',
      pass: '',
      code: '',
    }
  },
  methods: {
    async submitForm() {
      await this.$axios
        .post('/api/test', {
          data: 'Dummy',
        })
        .then((res) => {
          this.$swal('Success', 'Success', 'success')
          console.log(res)
        })
        .catch((res) => {
          this.$swal('Error', 'Error', 'error')
        })
    },
  },
}
</script>
