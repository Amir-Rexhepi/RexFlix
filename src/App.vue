<template>
  <TheNavigatore/>
<div class="container">
  <router-view></router-view>
</div>
</template>

<script>
import TheNavigatore from './components/TheNavigatore.vue';
export default{
  components: {TheNavigatore}
}
</script>