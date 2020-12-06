<template>
  <div
    class="container flex flex-col mx-auto my-0 justify-center items-center text-center"
  >
    <div class="space-y-6">
      <Logo />
      <h1
        class="font-quicksand font-light text-8xl text-white tracking-wide text-shadow-lg"
      >
        Presensi Amikom
      </h1>
      <div
        class="p-6 max-w-sm mx-auto bg-gray-50 rounded-xl shadow-md flex flex-col items-center space-x-4"
      >
        <form-presensi />
      </div>
    </div>
  </div>
</template>

<script>
import FormPresensi from '~/components/FormPresensi.vue'
export default {
  components: { FormPresensi },
}
</script>

<style>
.container {
  min-height: 100vh;
}
</style>
