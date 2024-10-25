import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlacesStore = defineStore('places', () => {
  const places = ref([]);
  const isLoading = ref(true);
  const isLoadingPlaces = ref(false);
  const userLocation = ref<[number, number]>();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        userLocation.value = [coords.longitude, coords.latitude];
        isLoading.value = false;
      },
      () => {
        userLocation.value = undefined;
        isLoading.value = false;
      },
    );
  };

  return {
    places: computed(() => places.value),
    isLoading: computed(() => isLoading.value),
    userLocation: computed(() => userLocation.value),
    isLoadingPlaces: computed(() => isLoadingPlaces.value),
    isUserLocationReady: computed(() => !!userLocation.value),
    getUserLocation,
  };
});
