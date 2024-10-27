import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', () => {
  const _isResultsBoxVisible = ref(false);

  return {
    isResultsBoxVisible: computed(() => _isResultsBoxVisible.value),
    showResultsBox: () => (_isResultsBoxVisible.value = true),
    hideResultsBox: () => (_isResultsBoxVisible.value = false),
  };
});
