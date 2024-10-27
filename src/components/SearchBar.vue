<script setup lang="ts">
import { computed, ref } from 'vue';

import SearchIcon from '@/icons/SearchIcon.vue';
import SearchResults from './SearchResults.vue';
import { usePlacesStore } from '@/stores/palces.store';

const placesStore = usePlacesStore();

const query = ref('');
const debounce = ref<number>();
const searchTerm = computed<string>({
  get() {
    return query.value;
  },
  set(newValue) {
    if (debounce.value) clearTimeout(debounce.value);
    debounce.value = setTimeout(() => {
      query.value = newValue;
      placesStore.searchPlacesByTerm(newValue);
    }, 500);
  },
});
</script>

<template>
  <div class="fixed top-4 left-4 w-80">
    <form action="">
      <label class="input input-bordered input-primary flex items-center gap-2">
        <input
          type="search"
          class="grow"
          placeholder="Search for a place"
          :disabled="!placesStore.userLocation"
          v-model.trim="searchTerm"
        />
        <search-icon class="h-5 w-5 opacity-70" />
      </label>
    </form>
    <search-results :search-term="query" />
  </div>
</template>
