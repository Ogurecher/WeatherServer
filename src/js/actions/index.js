import { LOAD_WEATHER, SET_LOCATION, LOADING, THROW_ERROR, ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES } from '../constants/action-types';

export function getLocation() {
  return function(dispatch) {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({ type: SET_LOCATION, payload: {city: null, lat: position.coords.latitude, lng: position.coords.longitude}});
      }, (e) => {
        const defaultCity = prompt('Enter default city');
        dispatch({ type: SET_LOCATION, payload: {city: defaultCity, lat: null, lng: null}});
      });
  }
}

export function getWeather(position, index) {
    return function(dispatch) {
      dispatch({ type: LOADING, payload: 1, index: index });
      let url;
      if (position.city) {
        url = `http://localhost:3000/weather?city=${position.city}`;
      } else {
        url = `http://localhost:3000/weather/coordinates?lat=${position.lat}&lon=${position.lng}`
      }
      return fetch(url)
          .then(response => {
            if (!response.ok){
              throw Error(response.statusText);
            };

            return response.json();
          })
          .then(json => {
            console.log(json);
            dispatch({ type: LOAD_WEATHER, payload: json, index: index });
          })
          .catch(error => {
            console.log('ERROR!!!!!');
            dispatch({ type: THROW_ERROR, payload: 'Location not found', index: index });
          });
    };
}

export function addToFavourites(city) {
  return function(dispatch) {
    const data = { cityName: city.toLowerCase() };
    const url = 'http://localhost:3000/favourites'
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        };

        return response.json();
      })
      .then((json) => {
        console.log(`saved ${data}, got ${json}`);
        dispatch({type: ADD_TO_FAVOURITES, payload: city.toLowerCase()});
      })
      .catch(error => {
        console.log('create error');
      });
  };
}

export function removeFromFavourites(city) {
  return function(dispatch) {
    const data = { cityName: city.toLowerCase() };
    const url = 'http://localhost:3000/favourites'
    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        };

        return response.json();
      })
      .then((json) => {
        console.log(`deleted ${data}, got ${json}`);
        dispatch({type: REMOVE_FROM_FAVOURITES, payload: city});
      })
      .catch(error => {
        console.log('delete error');
      });
  };
}