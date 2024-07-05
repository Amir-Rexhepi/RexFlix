<template>
       <div v-show="isLoading">
        <div class="loader" role="status">
             <span>Loading</span>
        </div>
    </div> 
    <section v-if="pages" >
        <h1 class="inizio1">{{ pages.name }}</h1>
        <img :src="`https://image.tmdb.org/t/p/w500${pages.poster_path}`" class="foto">
        <table>
          <tr>
            <th class="inizio">{{ translations.overview }}</th>
            <td class="testo">{{ pages.overview }}</td>
          </tr>
          <tr>
           <th class="inizio">{{ translations.genres }}</th>
            <div>
            <td v-for="(page, i) in pages.genres" :key="i" class="testo" >{{ page.name }}, </td>
          </div>
          </tr>
          <tr>
          <th class="inizio">{{translations.numberEpisodes}}</th>
            <div>
            <td class="testo" >{{ pages.number_of_episodes }}, </td>
          </div>
          </tr>
          <tr>
          <th class="inizio">{{ translations.numberSeasons }}</th>
            <div>
            <td class="testo" >{{ pages.number_of_seasons }}, </td>
          </div>
          </tr>
          <tr>
            <th class="inizio">{{ translations.firstdate }}</th>
            <td class="testo">{{ pages.first_air_date }}</td>
          </tr>
          <tr>
            <th class="inizio">{{ translations.lastdate }}</th>
            <td class="testo">{{ pages.last_air_date }}</td>
          </tr>
          <tr>
            <th class="inizio">{{translations.status}}</th>
            <td class="testo">{{ pages.status }}</td>
          </tr>  
          <tr>
            <th class="inizio">{{translations.languageEnglish}}</th>
            <div>
            <td v-for="(page, i) in pages.spoken_languages" :key="i" class="testo" >{{ page.english_name }}</td>
            </div>
          </tr>
          <tr>
            <th class="inizio">{{translations.originalLanguage}}</th>
            <td class="testo">{{ pages.original_language }}</td>
          </tr>
          <tr>
            <th class="inizio">{{ translations.popularity }}</th>
            <td class="testo">{{ pages.popularity }}</td>
          </tr>
          <tr>
            <th class="inizio">{{ translations.voteAverage }}</th>
            <td class="testo"><Star :rating="pages.vote_average"></Star></td>
          </tr>
          <tr>
            <td>  <div style="  float: center;">
      <label style="color: white" for="user-rating">{{ translations.yourRating }}</label>
      <StarRating v-model:rating="userRating"></StarRating>
      <button @click="submitRating" class="confermaRating">{{ translations.btn1}}</button>
      <button @click="resetiRating" class="resetRating">{{translations.btn2}}</button>
    </div></td>
          </tr>
        </table>   
        <br> 
        <br>
      
    </section>

</template>


<script>
import { mapState } from 'vuex';
  import Star from "./StarRating.vue";
import StarRating from "./Rating.vue";
export default{

     data(){
      return {
        pages: null,
        isLoading: false,
        userRating: 0,

      }
     },
     components: {
      Star,
      StarRating
     },
     created(){
      this.recuperoDatiScelta(this.$route.params.id)
     },
     computed: {
    ...mapState({
      translations: state => state.translations.dettagliSerie,
    }),
    language() {
      return this.$store.state.currentLanguage;
    },
  },
     watch:{
      '$route.params.id':{
        immediate: true,
       handler(newID){
        this.recuperoDatiScelta(newID);
        window.scrollTo(0,0);
       }
      },
      language: 'recuperoDatiScelta',
     },
     methods: {
     async recuperoDatiScelta(){
      const pageID = this.$route.params.id 
      this.isLoading = true;
            const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'
    }
  };
 
        let response = await fetch(`https://api.themoviedb.org/3/tv/${pageID}?language=${this.language}`, options)
          if (response.ok) {
            let data = await response.json();
            this.pages = data;
            this.isLoading = false;
          } else {
            console.error('Errore nel recupero dei dati');
          }this.isLoading = false
        },
        submitRating() {
      alert(`Hai dato un voto di: ${this.userRating} stelle`);
    },
    resetiRating(){
      this.userRating = 0;
    }
    }
  }
</script>