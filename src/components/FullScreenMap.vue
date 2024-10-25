<script setup lang="ts">
import { watch, ref } from 'vue';

import { Map } from 'mapbox-gl';

import { useMapStore } from '@/stores/map.store';
import { usePlacesStore } from '@/stores/palces.store';

const mapStore = useMapStore();
const placesStore = usePlacesStore();
const mapDiv = ref<HTMLDivElement>();

watch(mapDiv, () => {
  if (mapDiv.value && !placesStore.isLoading && placesStore.isUserLocationReady) {
    const map = new Map({
      container: mapDiv.value,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: placesStore.userLocation,
      zoom: 9,
    });

    mapStore.setMap(map);
  }
});
</script>

<template>
  <section class="w-screen h-screen">
    <div v-if="placesStore.isLoading" class="h-full flex justify-center">
      <span class="loading loading-ring loading-lg" aria-label="Loading map"></span>
    </div>

    <div v-else-if="!placesStore.userLocation" class="w-full h-full flex items-center">
      <p class="text-center mx-auto px-3">
        Sorry, you can't continue if you don't accept to use the browser geolocation :(
      </p>
    </div>

    <div v-else ref="mapDiv" class="w-full h-full" aria-label="Full screen map"></div>
  </section>
</template>

<style lang="css" scoped></style>
