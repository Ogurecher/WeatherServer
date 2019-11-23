export function loadState() {
    const serializedState = localStorage.getItem('state');
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