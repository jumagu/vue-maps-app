<script setup lang="ts">
import { useMapStore } from '@/stores/map.store';
import { usePlacesStore } from '@/stores/palces.store';
import LocationCurrentIcon from '@/icons/LocationCurrentIcon.vue';

const mapStore = useMapStore();
const placesStore = usePlacesStore();

const goToCurrentLocation = () => {
  if (!placesStore.userLocation) throw new Error('User location not provided.');
  if (!mapStore.map) throw new Error('Map is not ready.');
  mapStore.map?.flyTo({ zoom: 14, center: placesStore.userLocation });
};
</script>

<template>
  <button
    type="button"
    class="btn btn-primary fixed bottom-4 left-4 md:bottom-auto md:left-auto md:top-4 md:right-4"
    :disabled="!placesStore.userLocation || !mapStore.map"
    @click="goToCurrentLocation"
  >
    <location-current-icon class="w-5 h-5" aria-hidden="true" />
    My Location
  </button>
</template>
