<script setup lang="ts">
import { onMounted } from 'vue';

import SearchBar from '@/components/SearchBar.vue';
import { usePlacesStore } from '@/stores/palces.store';
import RouteDetails from '@/components/RouteDetails.vue';
import FullScreenMap from '@/components/FullScreenMap.vue';
import BtnMyLocation from '@/components/BtnMyLocation.vue';

const placesStore = usePlacesStore();

onMounted(() => {
  placesStore.getUserLocation();
});
</script>

<template>
  <main>
    <full-screen-map />
    <search-bar />
    <btn-my-location />
    <route-details />
  </main>
</template>
