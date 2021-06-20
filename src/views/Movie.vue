<template>
  <div class="movie-page">
    <header-controls pageTitle="Movie Page" buttonText="Edit" :callback="`/edit-movie/${movie.id}`" />
      <div class="content-wrapper">
        <img v-if="movie.image.includes('http')" v-bind:src="movie.image" alt="move image">
        <div>
          <div>
          <h2>Title</h2>
          <h3>{{movie.title}}</h3>
        </div>
        <div>
          <h2>Description</h2>
          <p>{{movie.description}}</p>
        </div>
        <div>
          <h2>Release Date</h2>
          <p>{{movie.release_date.toISOString().slice(0, 10)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderControls from '@/components/HeaderControls.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Movie',
  components: {
    HeaderControls
  },
  data() {
    return {
      movie: {}
    }
  },
  computed: {
    ...mapGetters(['movieById']),
    getMovie() {
      return this.movieById(this.$router.currentRoute.value.params.id)
    }
  },
  methods: {
    onEdit() {
      this.$router.push({ path: `/edit-movie/${this.movie.id}`})
    }
  },
  created(){
    this.movie = this.getMovie
  }
}
</script>

<style lang="scss" scoped> 
  .content-wrapper {
    display: flex;
    padding: 16px;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: '24px';
  }
  .list {
    list-style-type: none;
  }
  img {
    display: block;
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    .content-wrapper {
    flex-direction: column;
  }
  }
</style>
