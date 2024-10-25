<script setup lang="ts">
import { onMounted } from 'vue';

import SearchBar from '@/components/SearchBar.vue';
import { usePlacesStore } from '@/stores/palces.store';
import FullScreenMap from '@/components/FullScreenMap.vue';

const placesStore = usePlacesStore();

onMounted(() => {
  placesStore.getUserLocation();
});
</script>

<template>
  <main>
    <full-screen-map />
    <search-bar />
  </main>
</template>
