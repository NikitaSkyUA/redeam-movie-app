<template>
  <div class="movie-page">
    <div class="content-wrapper">
      <header-controls pageTitle="Edit movie" />
      <form v-on:submit.prevent="onSubmit">
        <div class="content-wrapper">
          <div>
            <h2>Image Url</h2>
            <input type="text" v-model="image">
          </div>
          <div>
            <h2>Title</h2>
            <input type="text" v-model="title">
          </div>
          <div>
            <h2>Description</h2>
            <textarea v-model="description" cols="30" rows="10"></textarea>
          </div>
          <div>
            <h2>Release Date</h2>
            <input type="date" v-model="date">
          </div>
        </div>
        <div>
          <button type="submit">Save</button>
          <button v-on:click="$router.push('/')" type="button">Cancel</button>
          <button v-on:click="deleteMovie" type="button">Delete</button>
        </div>
     </form>
    </div>
  </div>
</template>
<script>
import HeaderControls from '@/components/HeaderControls.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'EditMovie',
  components: {
    HeaderControls
  },
  data() {
    return {
      title: '',
      description: '',
      release_date: '',
      id: '',
      image: '',
      date: ''
    }
  },
  computed: {
    ...mapGetters(['movieById', 'editMovieById']),
    getMovie() {
      return this.movieById(this.$router.currentRoute.value.params.id)
    }
  },
  methods: {
    ...mapActions(['deleteMovieById']),
    deleteMovie() {
      this.$store.dispatch('deleteMovieById', this.id)
      this.$router.push('/')
    },
    onSubmit() {
      this.release_date = new Date(this.date)
      const movie = {...this.$data}
      delete movie.date
      this.$store.dispatch('editMovieById', movie)
      this.$router.push('/')
    }
  },
  created(){
    this.title = this.getMovie.title
    this.description = this.getMovie.description
    this.release_date = this.getMovie.release_date
    this.id = this.getMovie.id
    this.image = this.getMovie.image
    this.date = this.getMovie.release_date.toISOString().substr(0, 10)
  }
}
</script>
<style lang="scss" scoped>
  .content-wrapper {
    padding: 16px;
  }
</style>
