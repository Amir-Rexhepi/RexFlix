<template>
  <div>
    <div v-show="isLoading">
      <div class="loader" role="status">
      </div>
    </div>
    <section v-if="page" class="ordine">
      <h1 class="inizio1">{{ page.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500${page.poster_path}`" class="foto">
      <table>
        <tr>
          <th class="inizio">{{ translations.overview }}</th>
          <td class="testo">{{ page.overview }}</td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.genres }}</th>
          <td class="testo">
            <span v-for="(genre, i) in page.genres" :key="i">{{ genre.name }}<span v-if="i < page.genres.length - 1">, </span></span>
          </td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.releasedata}}:</th>
          <td class="testo">{{ page.release_date }}</td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.status }}:</th>
          <td class="testo">{{ page.status }}</td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.runtime }}:</th>
          <td class="testo">{{ page.runtime }} min</td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.originCountry }}:</th>
          <td class="testo">
            <span v-for="(country, i) in page.origin_country" :key="i">{{ country }}<span v-if="i < page.origin_country.length - 1">, </span></span>
          </td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.originalLanguage }}:</th>
          <td class="testo">
            <span v-for="(language, i) in page.spoken_languages" :key="i">{{ language.english_name }}<span v-if="i < page.spoken_languages.length - 1">, </span></span>
          </td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.popularity}}:</th>
          <td class="testo">{{ page.popularity }}</td>
        </tr>
        <tr>
          <th class="inizio">{{ translations.voteAverage }}:</th>
          <td class="testo"><Star :rating="page.vote_average"></Star></td>
        </tr>
        <tr>
            <td><div style="  float: center;">
      <label style="color: white" for="user-rating">{{ translations.yourRating }}</label>
      <StarRating v-model:rating="userRating"></StarRating>
      <button @click="submitRating" class="confermaRating">{{ translations.btn1}}</button>
      <button @click="resetiRating" class="resetRating">{{translations.btn2}}</button>
    </div></td>
        </tr>
      </table>
    </section> 
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Star from './StarRating.vue'; 
import StarRating from "./Rating.vue";

export default {
  components: {
    Star,
    StarRating
  },
  data() {
    return {
      page: null,
      isLoading: false,
      value: null,
      userRating: 0,
    };
  },
  computed: {
    ...mapState({
      translations: state => state.translations.dettagliFilm,
    }),
    language() {
      return this.$store.state.currentLanguage;
    },
  },
  created() {
    this.recuperoDatiScelta();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newID) {
        this.recuperoDatiScelta(newID);
      },
    },language: 'recuperoDatiScelta'
  },
  methods: {
    async recuperoDatiScelta() {
      const pageID = this.$route.params.id;
      this.isLoading = true;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'              },
      };

      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${pageID}?language=${this.language}`,
          options
        );

        if (response.ok) {
          let data = await response.json();
          this.page = data;
        } else {
          console.error('Errore nel recupero dei dati');
        }
      } catch (error) {
        console.error('Errore di rete:', error);
      } finally {
        this.isLoading = false;
      }
    },
    submitRating() {
      alert(`Hai dato un voto di: ${this.userRating} stelle`);
    },
    resetiRating(){
      this.userRating = 0;
    },
  },
};
</script>