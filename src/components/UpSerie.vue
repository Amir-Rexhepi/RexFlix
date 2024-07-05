<template>
    <div v-show="isLoading">
        <div class="loader" role="status">
             <span>Loading</span>
        </div>
    </div>            
        <div style="background-color: black;color: white;">
          <h1>{{ translations.live }}</h1>
        </div>
        <swiper :slides-per-view="5" :space-between="10"   navigation @reach-end="fetchDiretta":scrollbar="{hide: true,  draggable: true}"   :autoplay="{
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
            <h1>{{translations.topRated}}</h1>
        </div>
        <swiper :slides-per-view="5" :space-between="10"  navigation @reach-end="fetchVota":scrollbar="{hide: true,  draggable: true}"   :autoplay="{
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
        <div style="background-color: black; color:white">
        <h1>{{ translations.airingToday }}</h1>
        </div>
        <div v-for="inOndas in inOnda" :key="inOndas.id" class="home">
      <router-link :to="{ name: 'PageS', params: { id: inOndas.id } }">
        <img
          :src="`https://image.tmdb.org/t/p/w500${inOndas.poster_path}`"
          class="immagine"
        />
        <p class="titolo">
          {{translations.title}}: {{ inOndas.name }}<br />
          {{ translations.language }}: {{ inOndas.org }}
        </p>
        
      </router-link>
      
    </div>
    <br>
    <button  @click="caricaSerie" class="btn">{{translations.carica}}</button>
        <div style="background-color: black;color: white;">
            <h1>{{translations.mostPopular}}</h1>
        </div>
        <swiper :slides-per-view="5" :space-between="-50"  navigation @reach-end="fetchPopo":scrollbar="{hide: true,  draggable: true}"   :autoplay="{
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
                popo: [],
                vota:[],
                diretta:[],
                inOnda:[],
                isLoading: false,
                paginePopo: 1,
                pagineVota: 1,
                pagineDiretta: 1,
                pagineOnda: 1,
                loadingPopo: false,
                loadingvota: false,
                loadingDiretta: false,
                loadinginOnda: false,
                loadCount: 10,
            };
        },
        components: {
            Swiper,
            SwiperSlide,
            Autoplay
        },
        created() {
            this.loadAllData();
        },
        computed:{
        ...mapState({
      translations: state => state.translations.serie,
    }),
    language() {
      return this.$store.state.currentLanguage;
    },
       },
        methods: {
            async loadAllData() {
                this.isLoading = true
                await this.recuperoDatiSerie();
                this.isLoading = false;
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
                       await this.fetchLingua(data.results)
                        this.inOnda = [...this.inOnda, ...data.results.slice(0, this.loadCount)];
                        this.pagineOnda++;
                        this.loadinginOnda = false;
                    } else {
                        console.error("Errore nel recupero dei dati");
                    }
                    this.isLoading = false;
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
            },
            caricaSerie(){
                this.recuperoDatiSerie()
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
    };
</script>