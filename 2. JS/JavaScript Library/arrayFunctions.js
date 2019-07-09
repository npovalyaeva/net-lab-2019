function map(arr, funcMapper) {
    const mapArr = [];
    for (let i = 0; i < arr.length; i++) {
        const result = funcMapper(arr[i], i, arr);
        mapArr.push(result);
    }
    return mapArr;
}

function reduce(arr, reducer) { //!!! to check
    let accumulator === undefined ? 0 : initialValue;
    for (let i = 0; i < arr.length; i++)
        accumulator = reducer(accumulator, arr[i], i, arr);
    return accumulator;
}

function filter(arr, filteringPredicateFunc) {
    const filterArr = [];
    for (let i = 0; i < arr.length; i++) {
        const result = filteringPredicateFunc(arr[i], i, arr);
        if (result)
            filterArr.push(arr[i]);
    }
    return filterArr;
}

function first(arr) {
    return arr[0];
}

function last(arr) {
    return arr[arr.length - 1];
}