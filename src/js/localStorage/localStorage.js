export function loadState() {
    const serializedState = localStorage.getItem('state');
    /*return fetch('http://localhost:3000/favourites')
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then((json) => {
        return json;
    })
    .then((serializedState) => {
        if (serializedState === null) {
            return undefined;
          }
      
          let cities = {cities: []};
          if (JSON.parse(serializedState).favourites) {
              cities = { cities: JSON.parse(serializedState).favourites.map((city) => {
                  return {
                      position: {city: city, lat: null, lng: null}, 
                      weather: null,
                      loading: 0,
                      errorMsg: null
                  }})
              };
              return Object.assign({}, JSON.parse(serializedState), cities);
          }
          cities = {cities: [], favourites: []};
          return Object.assign({}, cities);
    });*/

    if (serializedState === null) {
      return undefined;
    }

    let cities = {cities: []};
    if (JSON.parse(serializedState).favourites) {
        cities = { cities: JSON.parse(serializedState).favourites.map((city) => {
            return {
                position: {city: city, lat: null, lng: null}, 
                weather: null,
                loading: 0,
                errorMsg: null
            }})
        };
        return Object.assign({}, JSON.parse(serializedState), cities);
    }
    cities = {cities: [], favourites: []};
    return Object.assign({}, cities);
}

export function saveState(state) {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}