import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { LngLatBounds, Marker, Popup, type Map, type SourceSpecification } from 'mapbox-gl';

import type { Feature } from '@/interfaces';
import directionsApi from '@/apis/directions.api';
import type { DirectionsResponse } from '@/interfaces/directions.interface';

export const useMapStore = defineStore('map', () => {
  const _map = ref<Map>();
  const _markers = ref<unknown[]>([]);
  const _distance = ref<number>();
  const _duration = ref<number>();

  const setMap = (map: Map) => {
    const currentLocationPopup = new Popup().setHTML(`
      <h4>I'm here</h4>
      <p>In this part of the world</p>
    `);

    new Marker({ color: '#4a00ff' })
      .setLngLat(map.getCenter())
      .setPopup(currentLocationPopup)
      .addTo(map);

    _map.value = map;
  };

  const setMarkersToPlaces = (places: Feature[]) => {
    _markers.value.forEach((marker) => (marker as Marker).remove());
    _markers.value = [];

    if (!_map.value) return;

    for (const place of places) {
      const popup = new Popup().setHTML(`
        <h4>${place.properties.name}</h4>
        <p>${place.properties.full_address}</p>
      `);

      const newMarker = new Marker({ color: '#4a00ff' })
        .setPopup(popup)
        .setLngLat(place.geometry.coordinates)
        .addTo(_map.value);

      _markers.value.push(newMarker);
    }

    // ? Clear current direction, distance and duration if polyline exists and there are no places
    if (_map.value?.getLayer('route') && !places.length) {
      _map.value.removeLayer('route');
      _map.value.removeSource('route');
      _distance.value = undefined;
      _duration.value = undefined;
    }
  };

  const getDirection = async (start: [number, number], end: [number, number]) => {
    const res = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);

    const { distance, duration, geometry } = res.data.routes[0];

    // ? Stats
    let kms = distance / 1000;
    kms = Math.round(kms * 100) / 100;

    const minutes = Math.round(duration / 60);

    _distance.value = kms;
    _duration.value = minutes;

    // ? Bounds
    const bounds = new LngLatBounds(start, start);

    // Add each bound to fit the polyline view
    for (const coord of geometry.coordinates) {
      bounds.extend(coord);
    }

    _map.value?.fitBounds(bounds, { padding: 100 });

    // ? Polyline
    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geometry.coordinates,
            },
          },
        ],
      },
    };

    if (_map.value?.getLayer('route')) {
      _map.value.removeLayer('route');
      _map.value.removeSource('route');
    }

    _map.value?.addSource('route', sourceData);

    _map.value?.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': '#4a00ff', 'line-width': 5 },
    });
  };

  return {
    // Getters
    map: computed(() => _map.value),
    markers: computed(() => _markers.value),
    distance: computed(() => _distance.value),
    duration: computed(() => _duration.value),

    // Actions
    setMap,
    getDirection,
    setMarkersToPlaces,
  };
});
