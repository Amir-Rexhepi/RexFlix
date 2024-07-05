<template>
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<script>

export default{
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        prevPage() {
            this.$emit('changePage', this.currentPage - 1);
        },
        nextPage(){
            this.$emit('changePage', this.currentPage + 1);
        }
    }
}


</script>