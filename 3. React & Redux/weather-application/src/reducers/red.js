export function weatherData(state = {}, action) {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return action.fetchedData;
        default:
            return state;
    }
}

export function activePlace(state = 0, action) {
    switch (action.type) {
        case 'SET_ACTIVE_PLACE':
            return action.placeIndex;
        default:
            return state;
    }
}

export function cities(state = citiesArr, action) {
    switch (action.type) {
        case 'SET_CITIES':
            return action.cities ;

        default:
            return state;
    }
}

var citiesArr = [
        { name: "Minsk", lat: "53.889092", lon : "27.542042" },
        { name: "Brest", lat: "52.093555", lon : "23.685681" },
        { name: "Grodno", lat: "53.677834", lon : "23.829529" },
        { name: "Gomel", lat: "52.424160", lon : "31.014272" },
        { name: "Vitebsk", lat: "55.183672", lon : "30.204791" },
        { name: "Mogilev", lat: "53.894548", lon : "30.330654" }
    ]
