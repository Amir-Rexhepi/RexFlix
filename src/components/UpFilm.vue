<template>
      <div v-show="isLoading">
        <div class="loader" role="status">
             <span>Loading</span>
        </div>
    </div> 
  <div style="background-color: black; color: white">
  <h1>{{ translations.incoming }} </h1>
  </div>
  <div>
    <swiper :slides-per-view="5":space-between="10" @reach-end="fetchultimeUsciteFilm":scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
      <swiper-slide v-for="ultimo in ultime" :key="ultimo.id">
        <router-link :to="{ name: 'Page', params: { id: ultimo.id } }">
        <img :src="`https://image.tmdb.org/t/p/w500${ultimo.poster_path}`" class="immagine"/>
      </router-link></swiper-slide>
    </swiper>
    <div style="background-color: black; color: white;"><h1>{{ translations.topRated }}</h1></div>
    <swiper :slides-per-view="5" :space-between="10"  @reach-end="fetchVotate" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules"> 
          <swiper-slide v-for="votato in votate" :key="votato.id">
              <router-link :to="{ name: 'Page', params: { id: votato.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${votato.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
      </swiper>
    <div style="background-color: black; color: white;"><h1>{{translations.recentlyAdded}}</h1></div>
    <div v-for="film in films" :key="film.id" class="home">
      <router-link :to="{ name: 'Page', params: { id: film.id } }">
        <img
          :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`"
          class="immagine"
        />
        <p class="titolo">
          {{translations.title}}: {{ film.title }}<br />
          {{translations.language}}: {{ film.org}}
        </p>
        
      </router-link>
     
    </div> <br>
    <button @click="caricaFilm" class="btn">{{translations.carica}}</button>
    <div style="background-color: black;color: white;"> <h1> {{translations.mostPopular}}</h1> </div>
    <swiper :slides-per-view="5":space-between="-50" @reach-end="fetchPopolari" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
      <swiper-slide v-for="pops in pop" :key="pops.id">
        <router-link :to="{ name: 'Page', params: { id: pops.id } }">
        <img :src="`https://image.tmdb.org/t/p/w500${pops.poster_path}`" class="immagine"/>
      </router-link></swiper-slide>
    </swiper>
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
  import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
  
export default {
    setup() {
      return {
        modules: [Scrollbar, Autoplay, Pagination, Navigation]
      };
    },
    data() {
        return {
            films: [],
            ultime: [],
            votate: [],
            pop: [],
            lingua:[],
            isLoading: false,
            pagineUltime: 1,
            pagineFilm: 1,
            pagineVotate: 1,
            paginePopolari: 1,
            loadingFilm: false,
            loadingultimeUsciteFilm: false,
            loadingVotate: false,
            loadingPopolari: false,
            loadCount: 10
        };
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    created() {
        this.loadAllData();
    },
    computed:{
        ...mapState({
      translations: state => state.translations.film,
    }),
    language() {
      return this.$store.state.currentLanguage;
    },
       },
    methods: {
        async loadAllData() {
            this.isLoading = true;
            await this.recuperoDatiFilm();
            await this.ultimeUsciteFilm();
            await this.ultimeVotateFilm();
            await this.piuPopolariFilm();
            this.isLoading = false;
        },
        async recuperoDatiFilm() {
          if(this.loadingFilm)return;
          this.isLoading = true
          this.loadingFilm = true;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'                  },
            };
            try {
                let response = await fetch(
                    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.pagineFilm}`,options);
                if (response.ok) {
                
                    let data = await response.json(); 
                     await this.fetchLingua(data.results);
                    this.films = [...this.films,...data.results.slice(0, this.loadCount)],
                    this.pagineFilm++;
                    this.loadingFilm = false;
                    this.isLoading = false
                } else {
                    console.error("Errore nel recupero dei dati");
                }
            } catch (error) {
                console.error("Errore nel recupero dei dati", error);
                this.loadingFilm = false;
                this.isLoading = false;
            }
        },
        async ultimeUsciteFilm() {
          if (this.loadingultimeUsciteFilm)return;
          this.loadingultimeUsciteFilm = true;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'
                }
            };
            try {
                let response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${this.pagineUltime}`, options);
                if (response.ok) {
                    const data = await response.json();
                    this.ultime = [...this.ultime, ...data.results];
                    this.pagineUltime++;
                    this.loadingultimeUsciteFilm = false;
                } else {
                    console.error("Errore nel recupero dei dati");
                }
            } catch (error) {
                console.error("Errore nel recupero dei dati", error);
                this.loadingultimeUsciteFilm = false;
            }
        },
        async ultimeVotateFilm() {
          if(this.loadingVotate) return;
          this.loadingVotate = true
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'
                  }
            };
            try {
                let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${this.pagineVotate}`, options);
                if (response.ok) {
                    let data = await response.json();
                    this.votate =[...this.votate, ...data.results];
                    this.pagineVotate++;
                    this.loadingVotate = false;
                } else {
                    console.error("Errore nel recupero dei dati");
                }
            } catch (error) {
                console.error("Errore nel recupero dei dati", error);
                this.loadingVotate = false;
            }
        },
        async piuPopolariFilm() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'                  }
            };
            try {
                let response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.paginePopolari}`, options);
                if (response.ok) {
                    let data = await response.json();
                    this.pop = [...this.pop, ...data.results];
                    this.paginePopolari++;
                    this.loadingPopolari = false;
                } else {
                    console.error("Errore nel recupero dei dati");
                }
            } catch (error) {
                console.error("Errore nel recupero dei dati", error);
                this.isLoading = false;
            }
        },
        fetchultimeUsciteFilm(){
          if (this.loadingultimeUsciteFilm)return;
          this.ultimeUsciteFilm()
        },
        fetchrecuperaFilm(){
          if(this.loadingFilm)return;
          this.recuperoDatiFilm()
        },
        fetchVotate(){
          if (this.loadingVotate) return
            this.ultimeVotateFilm()
        },
        fetchPopolari(){
          if(this.loadingPopolari)return;
          this.piuPopolariFilm()
        },
        caricaFilm(){
          this.recuperoDatiFilm()
        },
        async fetchLingua(results) {
          const options = {
            method: 'GET',
              headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'
              }
             };
         const languagesMap = {};

    // Crea una mappa di sigla di lingua -> nome completo della lingua
    for (let result of results) {
        if (!languagesMap[result.original_language]) {
            const langResponse = await fetch(`https://api.themoviedb.org/3/configuration/languages??language=en-US`, options);
            if (langResponse.ok) {
                const langData = await langResponse.json();
                for (let lang of langData) {
                    languagesMap[lang.iso_639_1] = lang.english_name;
                }
            } else {
                console.error("Errore nel recupero dei dati delle lingue");
            }
        }
        result.org = languagesMap[result.original_language];
          }
    }
 },
}
</script>