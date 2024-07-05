import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Film from "@/views/Film.vue"
import Serie from "@/views/Serie.vue";


const routes = [
    {path: '/', name: 'Home', component: Home },
    {path: '/film', name: 'Film', component: Film },
    {path: '/serie', name: 'Serie', component: Serie},
    {path: '/page/:id', 
        name: 'Page', 
        component: ()=>import('@/components/ClickPageFilm.vue'),
        props: true,},
    {path: '/pages/:id', 
            name: 'PageS', 
            component: ()=>import('@/components/ClickPageSerie.vue'),
            props: true,}
    

]


const router = createRouter({
    history: createWebHistory(),
    routes

})

export default router
