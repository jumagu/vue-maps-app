import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import searchApi from '@/apis/search.api';
import type { Feature, PlacesResponse } from '@/interfaces';

export const usePlacesStore = defineStore('places', () => {
  const _places = ref<Feature[]>([]);
  const _isLoading = ref(true);
  const _isLoadingPlaces = ref(false);
  const _userLocation = ref<[number, number]>();

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        _userLocation.value = [coords.longitude, coords.latitude];
        _isLoading.value = false;
      },
      () => {
        _userLocation.value = undefined;
        _isLoading.value = false;
      },
    );
  };

  const searchPlacesByTerm = async (query: string) => {
    if (!_userLocation.value) throw new Error('No user location.');
    if (query.trim().length === 0) return (_places.value = []);

    _isLoadingPlaces.value = true;

    try {
      const res = await searchApi.get<PlacesResponse>('', {
        params: {
          q: query,
          proximity: _userLocation.value?.join(','),
        },
      });
      _places.value = res.data.features;
    } catch (error) {
      console.error(error);
      _places.value = [];
    } finally {
      _isLoadingPlaces.value = false;
    }
  };

  return {
    // Getters
    places: computed(() => _places.value),
    isLoading: computed(() => _isLoading.value),
    userLocation: computed(() => _userLocation.value),
    isLoadingPlaces: computed(() => _isLoadingPlaces.value),

    // Actions
    getUserLocation,
    searchPlacesByTerm,
  };
});
