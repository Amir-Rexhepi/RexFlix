// store/indexx.js
import { createStore } from 'vuex';
import translations from '../locales/translate.json'; // Assumi che le traduzioni siano in un file `locales/translate.json` che esporta un oggetto con le traduzioni per lingua

export default createStore({
  state: {
    currentLanguage: 'en', // Lingua predefinita
    translations: translations['en'],
  },
  mutations: {
    setLanguage(state, newLanguage) {
      state.currentLanguage = newLanguage;
      state.translations = translations[newLanguage] || translations['en'];
    },
  },
  actions: {
    setLanguage({ commit }, newLanguage) {
      commit('setLanguage', newLanguage);
    },
  },
  getters: {
    t(state) {
      return state.translations;
    },
  },
});