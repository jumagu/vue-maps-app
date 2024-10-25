import { createApp } from 'vue';
import { createPinia } from 'pinia';

import mapboxgl from 'mapbox-gl';

import App from './App.vue';
import './assets/main.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

if (!navigator.geolocation) {
  alert(
    'You have not provided access to browser geolocation or your browser does not support this feature.',
  );
  throw new Error(
    'You have not provided access to browser geolocation or your browser does not support this feature.',
  );
}

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
