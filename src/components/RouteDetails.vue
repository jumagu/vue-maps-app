<script setup lang="ts">
import { useMapStore } from '@/stores/map.store';

const mapStore = useMapStore();
</script>

<template>
  <section
    v-if="mapStore.distance && mapStore.duration"
    class="p-2 sm:p-3 fixed bottom-4 right-4 rounded-box shadow-xl bg-white bg-opacity-60 backdrop-blur-sm select-none animate__animated animate__slideInRight animate__fast"
    aria-label="Details of the route"
  >
    <span class="text-xs sm:text-sm md:text-base block font-semibold"
      >Distance: {{ mapStore.distance }} <span class="text-primary">km</span></span
    >
    <span class="text-xs sm:text-sm md:text-base block font-semibold"
      >Duration: {{ mapStore.duration }} <span class="text-primary">minutes</span></span
    >
  </section>
</template>
