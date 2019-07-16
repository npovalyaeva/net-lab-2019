Array.prototype.each = function(action) {
    for (let i = 0; i < this.length; i++)
        action(this[i], i, this);
}

Array.prototype.map = function(mapper) {
    const mapArr = [];
    for (let i = 0; i < this.length; i++) {
        const result = mapper(this[i], i);
        mapArr.push(result);
    }
    return mapArr;
}

Array.prototype.reduce = function(reducer, initialValue) {   
    let accumulator = (initialValue === undefined) ? undefined : initialValue;
    for (let i = 0; i < this.length; i++)        
        if (accumulator !== undefined)
            accumulator = reducer.call(undefined, accumulator, this[i], i, a);
        else
            accumulator = this[i];
    return accumulator;
}

Array.prototype.find = function(predicateToFindFirstMatchingElement) {
    for (let i = 0; i < this.length; i++) {
        const result = predicateToFindFirstMatchingElement(this[i]);
        if (result)
            return this[i];
    }
}

Array.prototype.filter = function(filteringPredicate) {
    const filterArr = [];
    for (let i = 0; i < this.length; i++) {
        const result = filteringPredicate(this[i]);
        if (result)
            filterArr.push(this[i]);
    }
    return filterArr;
}

Array.prototype.where = function(matchingObject) {
    const whereArr = [];
    for (let i = 0; i < this.length; i++)
        if (compareObjects(this[i], matchingObject))
            whereArr.push(this[i]);
    return whereArr;
}

function compareObjects(obj1, obj2) {
    for (var key in obj2) {
        if (obj2[key] !== obj1[key])
            return false;
    }
    return true;
}

Array.prototype.first = function() {
    return this[0];
}

Array.prototype.last = function() {
    return this[this.length - 1];
}

Array.prototype.min = function(selector) {
    const selectArr = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i][selector] != undefined)
            selectArr.push(this[i][selector]);
    }
    return Math.min(...selectArr);
}

Array.prototype.max = function(selector) {
    const selectArr = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i][selector] != undefined)
            selectArr.push(this[i][selector]);
    }
    return Math.max(...selectArr);
}