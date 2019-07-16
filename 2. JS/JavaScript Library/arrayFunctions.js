function each(arr, action) {
    for (let i = 0; i < arr.length; i++)
        action(arr[i], i, arr);
}

function map(arr, mapper) {
    const mapArr = [];
    for (let i = 0; i < arr.length; i++) {
        const result = mapper(arr[i], i);
        mapArr.push(result);
    }
    return mapArr;
}

function reduce(arr, reducer, initialValue) {   
    let accumulator = (initialValue === undefined) ? undefined : initialValue;
    for (let i = 0; i < arr.length; i++)        
        if (accumulator !== undefined)
            accumulator = reducer.call(undefined, accumulator, arr[i], i, a);
        else
            accumulator = arr[i];
    return accumulator;
}

function find(arr, predicateToFindFirstMatchingElement) {
    for (let i = 0; i < arr.length; i++) {
        const result = predicateToFindFirstMatchingElement(arr[i]);
        if (result)
            return arr[i];
    }
}

function filter(arr, filteringPredicate) {
    const filterArr = [];
    for (let i = 0; i < arr.length; i++) {
        const result = filteringPredicate(arr[i]);
        if (result)
            filterArr.push(arr[i]);
    }
    return filterArr;
}

function where(arr, matchingObject) {
    const whereArr = [];
    for (let i = 0; i < arr.length; i++)
        if (compareObjects(arr[i], matchingObject))
            whereArr.push(arr[i]);
    return whereArr;
}

function compareObjects(obj1, obj2) {
    for (var key in obj2) {
        if (obj2[key] !== obj1[key])
            return false;
    }
    return true;
}

function first(arr) {
    return arr[0];
}

function last(arr) {
    return arr[arr.length - 1];
}

function min(arr, selector) {
    const selectArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][selector] != undefined)
            selectArr.push(arr[i][selector]);
    }
    return Math.min(...selectArr);
}

function max(arr, selector) {
    const selectArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][selector] != undefined)
            selectArr.push(arr[i][selector]);
    }
    return Math.max(...selectArr);
}