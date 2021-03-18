<template>
  <div
    class="container p-4 flex flex-col mx-auto my-0 justify-center items-center text-center"
  >
    <div class="space-y-6 font-quicksand font-light text-white">
      <Logo />
      <h1 class="text-4xl md:text-7xl lg:text-8xl tracking-wide text-shadow-lg">
        Presensi Amikom
      </h1>
      <div
        class="p-6 max-w-sm mx-auto bg-gray-50 rounded-xl shadow-md flex flex-col items-center space-x-4"
      >
        <form-presensi />
      </div>
      <p class="text-white text-opacity-70">
        Built by
        <a
          class="text-white text-opacity-100 hover:underline"
          target="_blank"
          href="https://www.github.com/cloudenum"
          >cloudenum</a
        >
      </p>
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
