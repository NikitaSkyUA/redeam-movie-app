import { shallowMount } from '@vue/test-utils'
import Home from '../../src/views/Home'
import store from '../../src/store'

describe('Home.vue', () => {
  let wrapper
  beforeEach(() => {
    
    store.state.movies = [{
      id: '1',
      title: 'b',
      description: 'a',
      release_date: new Date(),
      image: ''
    },
    {
      id: '2',
      title: 'a',
      description: 'b',
      release_date: new Date('2020-05-20'),
      image: ''
    },
    {
      id: '3',
      title: 'c',
      description: 'd',
      release_date: new Date(),
      image: ''
    }]
     wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $store: store,
       }
      }
    })
  })

  it('Home component has valid data from store', () => {
    expect(wrapper.vm.$data.moviesToShow).toEqual(store.state.movies)
  })

  it('Home component test sorting by title', () => {
    wrapper.vm.sortByTitle()
    expect(wrapper.vm.$data.moviesToShow[0].title[0].toLowerCase()).toEqual('a')
  })

  it('Home component test sorting by description', () => {
    wrapper.vm.sortByDescription()
    expect(wrapper.vm.$data.moviesToShow[0].description[0].toLowerCase()).toEqual('a')
  })

  it('Home component test sorting by release date', () => {
    wrapper.vm.sortByReleaseDate()
    expect(wrapper.vm.$data.moviesToShow[0].release_date < wrapper.vm.$data.moviesToShow[1].release_date).toEqual(true)
  })

  it('Home component test filter by date', () => {
    wrapper.vm.$data.dateToSearch = '2020-05-20'
    wrapper.vm.filterByDate()
    expect(wrapper.vm.$data.moviesToShow.length).toEqual(1)
  })

  it('Home component test filter by query', () => {
    wrapper.vm.$data.searchQuery = 'a'
    wrapper.vm.filterByQuery()
    expect(wrapper.vm.$data.moviesToShow.length).toEqual(2)
  })

})