import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { type Map, Marker, Popup } from 'mapbox-gl';

export const useMapStore = defineStore('map', () => {
  const _map = ref<Map>();
  const _markers = ref([]);
  const _distance = ref<number>();
  const _duration = ref<number>();

  const setMap = (map: Map) => {
    const currentLocationPopup = new Popup().setHTML(`
      <h4>I'm here</h4>
      <p>In this part of the world</p>
    `);

    new Marker().setLngLat(map.getCenter()).setPopup(currentLocationPopup).addTo(map);

    _map.value = map;
  };

  return {
    map: computed(() => _map.value),
    markers: computed(() => _markers.value),
    distance: computed(() => _distance.value),
    duration: computed(() => _duration.value),
    isMapReady: computed(() => !!_map.value),
    setMap,
  };
});
