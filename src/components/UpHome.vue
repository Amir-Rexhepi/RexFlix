<template>
  <div v-show="isLoading">
      <div class="loader" role="status">
           <span>Loading</span>
      </div>
  </div>
  <div style="background-color: black;color: white;">
          <h1>{{ translations.incoming }} </h1>
      </div>
  <div v-show="!isLoading">
      <swiper :slides-per-view="5" :space-between="10"  @reach-end="fetchultimeUsciteFilm"  :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
          <swiper-slide role="scrollbar" v-for="ultimo in ultime" :key="ultimo.id">
              <router-link :to="{ name: 'Page', params: { id: ultimo.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${ultimo.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
      </swiper>
      <br>
      <div style="background-color: black;color: white;">
          <h1>{{ translations.airingToday }}</h1>
      </div>
      <swiper :slides-per-view="5" :space-between="10"  @reach-end="fetchInOnda" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules" >
          <swiper-slide role="scrollbar" v-for="inOndas in inOnda" :key="inOndas.id">
              <router-link :to="{ name: 'PageS', params: { id: inOndas.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${inOndas.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
      </swiper>
      <br>
      <div style="background-color: black;color: white;">
          <h1>{{ translations.recentlyAdded}}</h1>
      </div>
      <swiper :slides-per-view="5" :space-between="10" @reach-end="fetchrecuperaFilm" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
          <swiper-slide v-for="film in films" :key="film.id">
              <router-link :to="{ name: 'Page', params: { id: film.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${film.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
      </swiper>
      <br>
      <div style="background-color: black;color: white;">
        <h1>{{ translations.live }}</h1>
      </div>
      <swiper :slides-per-view="5" :space-between="10"  @reach-end="fetchDiretta" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
          <swiper-slide role="scrollbar" v-for="dirette in diretta" :key="dirette.id">
              <router-link :to="{ name: 'PageS', params: { id: dirette.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${dirette.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
      </swiper>
      <div style="background-color: black;color: white;">
          <h1>{{ translations.topRated}}</h1>
      </div>
      <div style="background-color: black; color: white; text-align: start;">
        <h2>{{translations.film}}</h2>
      </div>
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
      <div style="background-color: black; color: white; text-align: start;">
        <h2 >{{ translations.serie }}</h2>
      </div>
      <swiper :slides-per-view="5" :space-between="10"  @reach-end="fetchVota" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
          <swiper-slide v-for="voti in vota" :key="voti.id">
              <router-link :to="{ name: 'PageS', params: { id: voti.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${voti.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
      </swiper>
      <div style="background-color: black;color: white;">
          <h1>{{translations.mostPopular}}</h1>
      </div>
      <div style="text-align: start; color: white; background-color: black;"><h2>{{translations.film}}</h2></div>
      <swiper :slides-per-view="5" :space-between="-50"   @reach-end="fetchPopolari" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
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
              </router-link>
          </swiper-slide>
      </swiper>
      <div style="text-align: start; color: white; background-color: black;"><h2>{{translations.serie}}</h2></div>
      <swiper :slides-per-view="5" :space-between="-50"  @reach-end="fetchPopo" :scrollbar="{hide: true,  draggable: true}"   :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
   modules="modules">
          <swiper-slide v-for="popos in popo" :key="popos.id">
              <router-link :to="{ name: 'PageS', params: { id: popos.id } }">
                  <img :src="`https://image.tmdb.org/t/p/w500${popos.poster_path}`" class="immagine"/>
              </router-link>
          </swiper-slide>
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
              popo: [],
              vota:[],
              diretta:[],
              inOnda:[],
              isLoading: false,
              pagineUltime: 1,
              pagineFilm: 1,
              pagineVotate: 1,
              paginePopolari: 1,
              paginePopo: 1,
              pagineVota: 1,
              pagineDiretta: 1,
              pagineOnda: 1,
              loadingFilm: false,
              loadingultimeUsciteFilm: false,
              loadingVotate: false,
              loadingPopolari: false,
              loadingPopo: false,
              loadingvota: false,
              loadingDiretta: false,
              loadinginOnda: false,
          };
      },
      components: {
          Swiper,
          SwiperSlide,
          Scrollbar
      },
      computed:{
        ...mapState({
      translations: state => state.translations.home,
    }),
      },
      created() {
        this.isLoading = true
               this.recuperoDatiFilm();
               this.ultimeUsciteFilm();
               this.ultimeVotateFilm();
               this.piuPopolariFilm();
               this.recuperoDatiSerie();
               this.recuperoDiretta();
               this.recuperoPopolari();
               this.recuperoVoti();
              this.isLoading = false;
      },
      watch: {
        language: 'recuperoDatiFilm',

      },
      methods: {
          async recuperoDatiFilm() {
            if(this.loadingFilm)return;
            this.loadingFilm = true;
            this.isLoading = true
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
                      this.films = [...this.films, ...data.results];
                      this.pagineFilm++;
                      this.loadingFilm = false;
                      this.isLoading = false;
                  } else {
                      console.error("Errore nel recupero dei dati");
                  }
              } catch (error) {
                  console.error("Errore nel recupero dei dati", error);
                  this.loadingFilm = false;
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
          async recuperoDatiSerie() {
            if(this.loadinginOnda)return;
            this.loadinginOnda = true;
              const options = {
                  method: 'GET',
                  headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'                  }
              };
              try {
                  let response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${this.pagineOnda}`, options);
                  if (response.ok) {
                      let data = await response.json();
                      this.inOnda = [...this.inOnda, ...data.results];
                      this.pagineOnda++;
                      this.loadinginOnda = false;
                  } else {
                      console.error("Errore nel recupero dei dati");
                  }
              } catch (error) {
                  console.error("Errore nel recupero dei dati", error);
                  this.loadinginOnda = false;
              }
          },
          async recuperoPopolari(){
            if(this.loadingPopo) return;
            this.loadingPopo = true;
              const options = {
                  method: 'GET',
                  headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'                  }
              };
              try {
                  let response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${this.paginePopo}`, options);
                  if (response.ok) {
                      let data = await response.json();
                      this.popo = [...this.popo, ...data.results];
                      this.paginePopo++;
                      this.loadingPopo = false;
                  } else {
                      console.error("Errore nel recupero dei dati");
                  }
              } catch (error) {
                  console.error("Errore nel recupero dei dati", error);
                  this.loadingPopo = false;
              }
          },
          async recuperoDiretta(){
            if(this.loadingDiretta) return;
            this.loadingDiretta = true;
              const options = {
                  method: 'GET',
                  headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'                  }
              };
              try {
                  let response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${this.pagineDiretta}`, options);
                  if (response.ok) {
                      let data = await response.json();
                      this.diretta = [...this.diretta, ...data.results];
                      this.pagineDiretta++;
                      this.loadingDiretta = false;
                  } else {
                      console.error("Errore nel recupero dei dati");
                  }
              } catch (error) {
                  console.error("Errore nel recupero dei dati", error);
                  this.loadingDiretta = false;
              }
          },
          async recuperoVoti(){
            if(this.loadingvota) return;
            this.loadingvota = true;
              const options = {
                  method: 'GET',
                  headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjU5MDAzYmMzY2M4MmRiZDM4ZGM1MDZiYmY5ZjU5YSIsIm5iZiI6MTcxOTMwODUzOC43MzczNiwic3ViIjoiNjQ3NzU2ZDcxMmM2MDQwMGMyYzAwYjdiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.gbzV5q-4G0ixagrceZwd4n3qsnOddSyQBpvtBEUUEow'                  }
              };
              try {
                  let response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${this.pagineVota}`, options);
                  if (response.ok) {
                      let data = await response.json();
                      this.vota = [...this.vota, ...data.results];
                      this.pagineVota++;
                      this.loadingvota = false;
                  } else {
                      console.error("Errore nel recupero dei dati");
                  }
              } catch (error) {
                  console.error("Errore nel recupero dei dati", error);
                  this.loadingvota = false;
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
          fetchPopo(){
            if(this.loadingPopo)return;
            this.recuperoPopolari()
          },
          fetchInOnda(){
            if(this.loadinginOnda)return;
            this.recuperoDatiSerie()
          },
          fetchDiretta(){
            if(this.loadingDiretta)return;
            this.recuperoDiretta()
          },
          fetchVota(){
            if(this.loadingvota)return;
            this.recuperoVoti()
          }
      },
  };
  </script>