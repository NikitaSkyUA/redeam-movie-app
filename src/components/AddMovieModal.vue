<template>
<div class="modal-wrapper">
  <form class="form" v-on:submit.prevent="onAddMovie">
    <h3>Add new movie</h3>
    <label for="title">
      Add movie title:
      <input type="text" id="title" v-model="title">
    </label>
    <label for="description">
      Add movie description:
      <div>
        <textarea name="description" id="description" v-model="description" cols="30" rows="10"></textarea>
      </div>
    </label>
    <label for="image">
      Image url:
      <input type="text" id="image" v-model="image">
    </label>
    <label for="date">
      Release date:
      <input type="date" id="date" v-model="date">
    </label>
    <div>
      <button type="submit">Add movie</button>
      <button type="button" v-on:click="toggleModal(false)">Cancel</button>
    </div>
  </form>
</div>
  
</template>
<script>
import faker from 'faker'
import {mapActions} from 'vuex'
export default {
  name: 'AddMovieModal',
  props: {
    toggleModal: Function,
  },
  data() {
    return {
      id: faker.datatype.uuid(),
      title: '',
      description: '',
      release_date: '',
      image: '',
      date: ''
    }
  },
  methods: {
    ...mapActions(['addNewMovie']),
    onAddMovie() {
      this.release_date = new Date(this.date)
      const movie = {...this.$data}
      delete movie.date
      this.addNewMovie(movie)
      this.toggleModal(false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    box-sizing: border-box;
    z-index: 1000;
  }
  .form {
    max-width: 928px;
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 4px 2px 2px 0px rgba(0,0,0,0.7);
    padding: 30px;
    box-sizing: border-box;
  }
  input {
    width: 100%;
    display: block;
    margin: 0 0 15px 0;
    box-sizing: border-box;
  }
  textarea {
    width: 100%;
    box-sizing: border-box;
  }
</style>