(function (myAwesomeLibrary) {

    var innerArr;

    myAwesomeLibrary.asChain = function(arr) {
        innerArr = arr;
        return innerArr;
    }

    myAwesomeLibrary.Array.property.each = function(action) {
        for (let i = 0; i < innerArr.length; i++)
            action(innerArr[i], i, innerArr);
    }

    myAwesomeLibrary.Array.property.map = function(mapper) {
        const mapArr = [];
        for (let i = 0; i < innerArr.length; i++) {
            const result = mapper(innerArr[i], i);
            mapArr.push(result);
        }
        return mapArr;
    }

    myAwesomeLibrary.Array.property.reduce = function(reducer) {
        return (initialValue) => {
            let accumulator = (initialValue === undefined) ? undefined : initialValue;
            for (let i = 0; i < innerArr.length; i++)        
                if (accumulator !== undefined)
                    accumulator = reducer.call(undefined, accumulator, innerArr[i], i, innerArr);
                else
                    accumulator = innerArr[i];
            return accumulator; 
        } 
    }

    myAwesomeLibrary.Array.property.find = function(predicateToFindFirstMatchingElement) {
        for (let i = 0; i < innerArr.length; i++) {
            const result = predicateToFindFirstMatchingElement(innerArr[i]);
            if (result)
                return innerArr[i];
        }
    }

    myAwesomeLibrary.Array.property.filter = function(filteringPredicate) {
        const filterArr = [];
        for (let i = 0; i < innerArr.length; i++) {
            const result = filteringPredicate(innerArr[i]);
            if (result)
                filterArr.push(innerArr[i]);
        }
        return filterArr;
    }

    myAwesomeLibrary.Array.property.where = function(matchingObject) {
        const whereArr = [];
        for (let i = 0; i < innerArr.length; i++)
            if (compareObjects(innerArr[i], matchingObject))
                whereArr.push(innerArr[i]);
        return whereArr;
    }

    var compareObjects = function(obj1) {
        return (obj2) => {
            for (var key in obj2) {
                if (obj2[key] !== obj1[key])
                    return false;
            }
            return true;
        }
    }

    myAwesomeLibrary.Array.property.first = function() {
        return innerArr[0];
    }
        
    myAwesomeLibrary.Array.property.last = function() {
        return innerArr[innerArr.length - 1];
    }
        
    myAwesomeLibrary.Array.property.min = function() {
        return (selector) => {
            const selectArr = [];
            for (let i = 0; i < innerArr.length; i++) {
                if (innerArr[i][selector] != undefined)
                    selectArr.push(innerArr[i][selector]);
            }
            return Math.min(...selectArr);
        }
    }
        
    myAwesomeLibrary.Array.property.max = function() {
        return (selector) => {
            const selectArr = [];
            for (let i = 0; i < innerArr.length; i++) {
                if (innerArr[i][selector] != undefined)
                    selectArr.push(innerArr[i][selector]);
            }
            return selectArr;
            //return Math.max(...selectArr);
        }
    }
}(myAwesomeLibrary));