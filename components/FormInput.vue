<template>
  <label class="block">
    <span class="text-gray-700">{{ label }}</span>
    <input
      :id="identifier"
      :name="identifier"
      class="transition-border-color duration-500 ease-linear mt-1 block w-full rounded-full bg-gray-200 focus:border-amikom focus:bg-white outline-none"
      :placeholder="placeholder"
      :type="type"
      :pattern="pattern"
      required
    />
  </label>
</template>

<script>
export default {
  props: {
    identifier: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Label',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    pattern: {
      type: String,
      default: '',
    },
  },
}
</script>
