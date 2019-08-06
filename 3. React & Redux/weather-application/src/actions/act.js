export function setActivePlace(placeIndex) {
    return {
        type: 'SET_ACTIVE_PLACE',
        placeIndex
    };
}

export function fetchCityDataSuccess(fetchedData) {
    return {
        type: 'FETCH_CITY_DATA_SUCCESS',
        fetchedData
    };
}

export function fetchWeatherDataSuccess(fetchedData) {
    return {
        type: 'FETCH_WEATHER_DATA_SUCCESS',
        fetchedData
    };
}


export function setCities(cities) {
    return {
        type: 'SET_CITIES',
        cities
    };
}

export function fetchData(url) {
    return (dispatch) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'X-Yandex-API-Key' : 'b5a43458-5c75-4958-bb67-b59a4142f220'
            }
        })
        .then(res => res.json())
        .then(json => {
            dispatch(fetchWeatherDataSuccess(json));
        })
        .catch((err)=>console.log(err));
    };
}

export function fetchCity(url) {
    debugger;
    return (dispatch) => {
        fetch(url)
        .then(res => res.json())
        .then(json => console.log(json))
        .then(json => {
            dispatch(fetchCityDataSuccess(json));
        })
        .catch((err)=>console.log(err));
    };
}
