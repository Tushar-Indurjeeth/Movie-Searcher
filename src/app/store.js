import { createStore, action, persist } from 'easy-peasy';

const model = {
  movies: {
    favourites: [],
    isFavourite: false,

    addMovie: action((state, payload) => {
      state.favourites.push(payload);
      // console.log(debug(state));
    }),

    removeMovie: action((state, payload) => {
      state.favourites = state.favourites.filter(
        (movie) => movie.imdbID !== payload.imdbID
      );
    }),

    checkFavourite: action((state, payload) => {
      state.isFavourite =
        state.favourites.filter((item) => item.imdbID === payload).length === 1;
    }),
  },

  cardView: {
    isCardView: true,
    switchView: action((state) => {
      state.isCardView = !state.isCardView;
    }),
  },

  modalView: {
    showModal: false,
    movieDetails: {},

    displayModal: action((state) => {
      state.showModal = !state.showModal;
    }),

    addMovieDetails: action((state, payload) => {
      state.movieDetails = {};
      state.movieDetails = payload;
    }),
  },
};

const store = createStore(persist(model));

export { store };
