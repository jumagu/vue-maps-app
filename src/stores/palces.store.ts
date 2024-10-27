import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import searchApi from '@/apis/search.api';
import type { Feature, PlacesResponse } from '@/interfaces';

export const usePlacesStore = defineStore('places', () => {
  const places = ref<Feature[]>([]);
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

  const searchPlacesByTerm = async (query: string) => {
    if (!userLocation.value) throw new Error('No user location.');
    if (query.trim().length === 0) return (places.value = []);

    isLoadingPlaces.value = true;

    try {
      const res = await searchApi.get<PlacesResponse>('', {
        params: {
          q: query,
          proximity: userLocation.value?.join(','),
        },
      });
      places.value = res.data.features;
    } catch (error) {
      console.error(error);
      places.value = [];
    } finally {
      isLoadingPlaces.value = false;
    }
  };

  return {
    // Getters
    places: computed(() => places.value),
    isLoading: computed(() => isLoading.value),
    userLocation: computed(() => userLocation.value),
    isLoadingPlaces: computed(() => isLoadingPlaces.value),

    // Actions
    getUserLocation,
    searchPlacesByTerm,
  };
});
