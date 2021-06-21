<template>
  <div class="home">
    <header-controls pageTitle="Movie List" buttonText="Add movie" :callback="() => toggleModal(true)" />
    <div class="content-wrapper">
      <add-movie-modal :toggleModal="toggleModal" v-if="openModal"></add-movie-modal>
      <div class="filters" :class="{'active': filtersOpen}">
        <div>
          <button v-on:click="sortByTitle">sort by title</button>
          <button v-on:click="sortByDescription">sort by description</button>
          <button v-on:click="sortByReleaseDate">sort by release date</button>
          <input type="text" placeholder="Search" v-model="searchQuery" v-on:input="filterByQuery">
          <div>
            <input type="date" v-on:change="filterByDate" v-model="dateToSearch" >
          </div>
          <label for="before">
            <input 
            id="before" 
            v-on:change=" filterByDate" 
            type="radio" 
            name="paramForDateSearch" 
            value="0" 
            v-model="paramForDateSearch">
            Before this date
          </label>
          <label for="specific">
            <input 
            id="specific" 
            v-on:change="filterByDate" 
            type="radio" 
            name="paramForDateSearch" 
            value="1" 
            v-model="paramForDateSearch">
            Specific date
          </label>
          <label for="after">
            <input 
            id="after" 
            v-on:change="filterByDate" 
            type="radio" 
            name="paramForDateSearch" 
            value="2" 
            v-model="paramForDateSearch">
            After this date
          </label>
          <div>
            <button v-on:click="dropToDefault">drop filters to default</button>
          </div>
            <button type="button" v-on:click="toggleFilter" class="mobile-controls">
              {{filtersOpen ? 'Open filters' : 'Open filters' }}
            </button>
        </div>
      </div>
      <div class="last-wrapper">
        <ul class="movie-list">
          <li v-for="movie in paginatedMovies" v-bind:key="movie.id" v-on:click="$router.push({ path: `/movie/${movie.id}`})">
            <movie-list-item v-bind:movie="movie"/>
          </li>
        </ul>
        <div v-if="moviesToShow.length > 9" class="pagination">
          <span v-if="currentPage > 1" v-on:click="currentPage--"> - </span>
          <input type="text" v-model="currentPage">
          <span v-if="currentPage < (moviesToShow.length / 10) - 1" v-on:click="currentPage++"> + </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderControls from '@/components/HeaderControls.vue'
import MovieListItem from '@/components/MovieListItem.vue'
import AddMovieModal from '@/components/AddMovieModal.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    MovieListItem,
    AddMovieModal,
    HeaderControls
  },
  data() {
    return {
      currentPage: 1,
      moviesToShow: [],
      searchQuery: '',
      dateToSearch: '',
      paramForDateSearch: '1',
      openModal: false,
      filtersOpen: false
    }
  },
  computed: {
    ...mapGetters(['movies']),
    paginatedMovies() {
      const startIndex = Number(this.currentPage + '0')
      return this.moviesToShow.filter((_, index) => {
        if(this.moviesToShow.length < 10) return true
        if (startIndex <= 1) return index < 10
        if (startIndex < this.moviesToShow.length) return index >= startIndex && index < startIndex + 10
      })
    }
  },
  methods: {
    toggleFilter() {
      this.filtersOpen = !this.filtersOpen
    },
    toggleModal(bool) {
      this.openModal = bool
    },
    dropToDefault() {
      this.moviesToShow = this.movies
      this.paramForDateSearch = '1'
    },
    sortByTitle() {
      this.moviesToShow = this.moviesToShow.sort((a, b) => a.title.localeCompare(b.title))
    },
    sortByDescription() {
      this.moviesToShow = this.moviesToShow.sort((a, b) => a.description.localeCompare(b.description))
    },
    sortByReleaseDate() {
      this.moviesToShow = this.moviesToShow.sort((a,b) => new Date(a.release_date) - new Date(b.release_date))
    },
    filterByQuery() {
      this.moviesToShow = this.searchQuery.length === 0 ? this.movies : this.moviesToShow.filter(movie =>
       movie.title.indexOf(this.searchQuery) >= 0 || movie.description.indexOf(this.searchQuery) >= 0)
    },
    filterByDate() {
      if(this.dateToSearch.length === 0) return null
      this.moviesToShow = this.movies.filter(movie => {
      switch(this.paramForDateSearch) {
        case '0':
          return movie.release_date <= new Date(this.dateToSearch)
        case '2':
          return movie.release_date >= new Date(this.dateToSearch) 
        default:
          return movie.release_date.toISOString().slice(0, 10) === this.dateToSearch
      } 
    })
    }
  },
  created() {
    this.moviesToShow = this.movies
  },
}
</script>
<style lang="scss" scoped>
  .mobile-controls {
    display: none;
  }
  .last-wrapper {
    position: relative;
  }
  .pagination {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 16px;
    background-color: #fff;
    span {
      cursor: pointer;
      display: block;
      padding: 0 16px;
      font-size: 20px;
    }
    input {
      width: 32px;
    }
  }
  .movie-list {
    position: relative;
    list-style-type: none;
    padding: 0 0 16px 0;
    margin: 0;
    max-height: 87vh;
    overflow: hidden;
    overflow-y: scroll;
  }
  .filters {
    max-width: 170px;
  }
  .content-wrapper {
    display: flex;
    padding: 16px;
  }
  label {
    display: block;
  }
  input {
    margin-bottom: 16px;
  }
  @media (max-width: 768px) {
    .filters {
      position: absolute;
      left: -170px;
      top: 87px;
      height: 100%;
      background-color: #fff;
      z-index: 100;
      transition: all ease-in-out 0.3s;
      &.active {
        left: 0;
      }
    }
    .mobile-controls {
      display: block;
      position: absolute;
      top: 0;
      right: -120px;
      z-index: 999;
    }
  }
</style>
