import { createStore } from 'vuex'
import faker from 'faker'

const fakeDataGenerator =  () => {
  let movieArray = []
  for(let i = 0; i < 100; i++) {
    movieArray.push({
      id: faker.datatype.uuid(),
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      image: faker.image.imageUrl(),
      release_date: faker.date.past()
    })
  }
  return movieArray
}

const movieArray = fakeDataGenerator()

export default createStore({
  state: {
    movies: movieArray,
  },
  mutations: {
    deleteMovie: (state, id) => state.movies = state.movies.filter(movie => movie.id !== id),

    editMovie: (state, movie) => state.movies = state.movies.map(m => m.id === movie.id ? movie : m),

    addMovie: (state, movie) => state.movies.push(movie)
  },
  getters: {
    movies: state => state.movies,

    movieById: state => id => state.movies.find(movie => movie.id === id),
  },
  actions: {
    deleteMovieById: ({commit}, id) => commit('deleteMovie', id),

    editMovieById: ({commit}, movie) => commit('editMovie', movie),

    addNewMovie: ({commit}, movie) => commit('addMovie', movie)
  },
})
