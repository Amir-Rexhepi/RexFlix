<template>
    <div class="star-rating">
      <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= Math.round(rating / 2) }">&#9733;</span>
    </div>
  </template>

  <script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true
      }
    }
  };
  </script>

  <style scoped>
  .star-rating {
    display: inline-block;
  }

  .star {
    font-size: 20px;
    color: #d3d3d3;  
  }

  .star.filled {
    color: #f9e63d;
  }
  </style>