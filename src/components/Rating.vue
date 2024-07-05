<template>
    <div class="star-rating">
      <span
        v-for="n in 5"
        :key="n"
        @click="setRating(n)"
        @mouseover="hoverRating(n)"
        @mouseleave="hoverRating(0)"
        :class="{ 'filled': n <= (hoverValue || rating) }"
      >
        &#9733;
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rating: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        hoverValue: 0
      };
    },
    methods: {
      setRating(value) {
        this.$emit('update:rating', value);
      },
      hoverRating(value) {
        this.hoverValue = value;
      }
    }
  };
  </script>
  
  <style>
  .star-rating {
    font-size: 30px;
    color: #ccc;
  }
  .star-rating .filled {
    color: #f39c12;
  }
  .star-rating span {
    cursor: pointer;
  }
  </style>