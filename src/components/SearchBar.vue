<script setup lang="ts">
import { computed, ref, type Directive } from 'vue';

import { useUiStore } from '@/stores/ui.store';
import SearchIcon from '@/icons/SearchIcon.vue';
import SearchResults from './SearchResults.vue';
import { usePlacesStore } from '@/stores/palces.store';

const uiStore = useUiStore();
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

const vClickOutside: Directive = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('mousedown', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.clickOutsideEvent);
  },
};
</script>

<template>
  <section
    class="fixed w-auto top-4 left-4 right-4 md:w-80 md:left-4 md:right-0"
    v-click-outside="uiStore.hideResultsBox"
    aria-label="Search Bar"
  >
    <form action="">
      <label
        class="input input-bordered input-primary flex items-center gap-2"
        aria-label="Search Input"
      >
        <input
          type="search"
          class="grow"
          placeholder="Search for a place"
          :disabled="!placesStore.userLocation"
          v-model.trim="searchTerm"
          @focus="uiStore.showResultsBox"
        />
        <search-icon class="h-5 w-5 opacity-70" aria-hidden="true" />
      </label>
    </form>
    <search-results :search-term="query" />
  </section>
</template>
