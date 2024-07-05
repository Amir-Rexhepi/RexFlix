<template>
  <div id="nav">
    <router-link to="/" id="logo"><img src="./icons/2598aff7338948123fb8c1d72b5d2b15.png" /></router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/film">Film</router-link>
    <router-link to="/serie">Serie</router-link>    
    <select id="language-select" class="select" @change="this.changeLanguage($event)">
        <option value="en">English</option>
        <option value="it">Italiano</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
      </select>
    <form class="search-box" role="search" @submit.prevent="searchMovies">
      <button  class="btn-search" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg></button>
      <input class="input-search" type="search" placeholder="Search" aria-label="Search" v-model="query"/>
    </form>
  
  </div>
  <div style="padding: 0 200px 10px 200px;" id="carousel-search" >
    <swiper :slides-per-view="6" :space-between="10" class="carousel-search-body">
      <swiper-slide v-for="search in searchResults" :key="search.id">
        <router-link :to="getResultLink(search)">
          <div class="card h-100">
            <img :src="`https://image.tmdb.org/t/p/w500${search.poster_path}`" class="card carousel-search-body-img" alt="ops non abbiamo la foto" />
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <div v-if="searchResults.length === 0 && query" style="background-color: black; color: white; text-align: center;">
      <p>Nessun risultato trovato.</p>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  data: () => ({
    query: '',
    searchResults: [],
  }),
  components: { Swiper, SwiperSlide },
  methods: {
    async searchMovies() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'
        }
      };
      try {
        const [moviesResponse, tvShowsResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/search/movie?query=${this.query}`, options),
          fetch(`https://api.themoviedb.org/3/search/tv?query=${this.query}`, options)
        ]);
        const movies = await moviesResponse.json();
        const series = await tvShowsResponse.json();
        const moviesWithMediaType = movies.results.map(movie => ({ ...movie, media_type: 'movie' }));
        const seriesWithMediaType = series.results.map(tvShow => ({ ...tvShow, media_type: 'tv' }));
        this.searchResults = [...moviesWithMediaType, ...seriesWithMediaType];
      } catch (error) {
        console.error('Errore nella ricerca dei film e delle serie:', error);
      }
    },
    getResultLink(results) {
      if (results.media_type === 'movie') {
        console.log(results.media_type);
        return  {name: 'Page', params:{id: results.id}}
        
      } else if (results.media_type === 'tv') {
        console.log(results.media_type);
        return  {name: 'PageS', params:{id: results.id}}
      }console.log(results.media_type)
      return '#';
    },
    changeLanguage(event) {
      this.$store.commit('setLanguage', event.target.value);
    },
  }
};
</script>