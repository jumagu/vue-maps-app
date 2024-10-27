<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import type { Feature } from '@/interfaces';
import { useMapStore } from '@/stores/map.store';
import { usePlacesStore } from '@/stores/palces.store';
import DirectionsIcon from '@/icons/DirectionsIcon.vue';

interface Props {
  searchTerm: string;
}

defineProps<Props>();

const activePlace = ref('');
const mapStore = useMapStore();
const { places, userLocation, isLoadingPlaces } = storeToRefs(usePlacesStore());

const selectPlaceHandler = (place: Feature) => {
  mapStore.map?.flyTo({ zoom: 14, center: place.geometry.coordinates });
  activePlace.value = place.id;
};

const getDirectionHandler = (coords: [number, number]) => {
  if (!userLocation.value) return;
  mapStore.getDirection(userLocation.value, coords);
};

watch(places, (newPlaces) => {
  activePlace.value = '';
  mapStore.setMarkersToPlaces(newPlaces);
});
</script>

<template>
  <div v-show="true" class="mt-2 rounded-box max-h-80 overflow-y-scroll">
    <div v-if="isLoadingPlaces" class="py-4 flex bg-base-200">
      <span
        class="loading loading-spinner loading-md text-primary mx-auto"
        aria-label="Loading places"
      />
    </div>

    <div
      v-if="searchTerm.trim().length > 0 && places.length === 0 && !isLoadingPlaces"
      class="py-4 flex bg-base-200"
    >
      <span class="mx-auto">No results found.</span>
    </div>

    <ul
      v-if="places.length > 0 && !isLoadingPlaces"
      class="menu bg-base-200"
      aria-label="Search result"
    >
      <li v-for="place in places" :key="place.id" @click="selectPlaceHandler(place)">
        <div :class="['flex justify-between', { active: activePlace === place.id }]">
          <div class="">
            <h3 class="w-32 truncate">{{ place.properties.name }}</h3>
            <p class="w-32 truncate">{{ place.properties.full_address }}</p>
          </div>

          <button
            class="btn btn-sm btn-primary"
            @click.stop="getDirectionHandler(place.geometry.coordinates)"
          >
            <directions-icon class="w-4 h-4" />
            Directions
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
