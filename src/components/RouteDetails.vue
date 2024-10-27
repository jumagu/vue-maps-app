<script setup lang="ts">
import { useMapStore } from '@/stores/map.store';

const mapStore = useMapStore();
</script>

<template>
  <Transition>
    <div
      v-if="mapStore.distance && mapStore.duration"
      class="p-3 fixed bottom-4 right-4 rounded-box shadow-xl bg-white bg-opacity-60 backdrop-blur-sm select-none animate__animated animate__slideInRight animate__fast"
    >
      <span class="block font-semibold"
        >Distance: {{ mapStore.distance }} <span class="text-primary">km</span></span
      >
      <span class="block font-semibold"
        >Duration: {{ mapStore.duration }} <span class="text-primary">minutes</span></span
      >
    </div>
  </Transition>
</template>

<style lang="css" scoped>
/* .v-enter-active,
.v-leave-active {
  @apply animate__animated animate__slideInRight animate__fast;
}

.v-enter-from,
.v-leave-to {
  @apply animate__animated animate__slideInLeft animate__fast;
} */
</style>
