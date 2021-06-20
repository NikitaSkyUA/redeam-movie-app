<template>
  <div class="movie-item">
    <img class="movie-item__image" v-if="movie.image.includes('http')" v-bind:src="movie.image" alt="">
    <div>
      <div class="title-wrapper">
        <h3>{{movie.title}}</h3>
        <p>release date : {{movie.release_date.toISOString().slice(0, 10)}}</p>
      </div>
      <p>{{movie.description}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MovieListItem',
    props: {
      movie: Object
    },
  }
</script>

<style scoped lang="scss">
  .movie-item {
    width: 100%;
    min-height: 150px;
    display: flex;
    align-items: flex-start;
    margin: 5px 0;
    padding: 16px;
    cursor: pointer;
    &:hover {
      background-color: rgba(49,38, 30, 0.1);
    }
  }
  .movie-item__image {
    display: block;
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
  .title-wrapper {
    display: flex;
    align-items: center;
  }
  h3 {
    margin: 0 10px 0 0;
  }
  p {
    margin: 0;
  }
</style>
