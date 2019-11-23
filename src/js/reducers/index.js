import { LOAD_WEATHER, SET_LOCATION, LOADING, THROW_ERROR, ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants/action-types';

const initialState = {
  weather: null,
  position: {city: null, lat: null, lng: null},
  loading: 0,
  errorMsg: null,
  favourites: [],
  cities: []
};

function rootReducer(state = initialState, action) {

  if (action.type === LOAD_WEATHER) {
    if (action.index !== null) {
      const cities = state.cities.slice();
      cities[action.index] = {
        position: state.cities[action.index].position,
        weather: action.payload,
        loading: 0,
        errorMsg: null
      }
      return Object.assign({}, state, {
        cities: cities
      });
    }

    return Object.assign({}, state, {
      weather: action.payload,
      loading: 0,
      errorMsg: null
    });
  }

  if (action.type === SET_LOCATION) {
    return Object.assign({}, state, {
      position: action.payload
    });
  }

  if (action.type === LOADING) {
    if (action.index !== null) {
      const cities = state.cities.slice();
      cities[action.index].loading = action.payload;
      return Object.assign({}, state, {
        cities: cities
      });
    }

    return Object.assign({}, state, {
      loading: action.payload
    });
  }

  if (action.type === THROW_ERROR) { 
    if (action.index !== null) {
      const cities = state.cities.slice();
      cities[action.index].errorMsg = action.payload;
      cities[action.index].loading = 0;
      return Object.assign({}, state, {
        cities: cities
      });
    }

    return Object.assign({}, state, {
      errorMsg: action.payload,
      loading: 0
    });
  }

  if (action.type === ADD_TO_FAVOURITES) {
    if (!state.favourites.includes(action.payload)) {
      return Object.assign({}, state, {
        favourites: state.favourites.concat([action.payload]),
        cities: state.cities.concat({position: {city: action.payload, lat: null, lng: null}, weather: null, loading: 0, errorMsg: null })
      });
    }
  }

  if (action.type === REMOVE_FROM_FAVOURITES) {
    /*const newCities = state.cities.filter((city) => {
      return city.position.city !== action.payload;
    });*/
    const newCities = state.cities.slice();
    const newFavourites = state.favourites.filter((favourite) => {
      return favourite !== action.payload;
    });
    return Object.assign({}, state, {
      favourites: newFavourites,
      cities: newCities
    });
  }

  return state;
}

export default rootReducer;