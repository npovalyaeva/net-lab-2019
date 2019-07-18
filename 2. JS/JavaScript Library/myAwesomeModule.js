var myAwesomeModule = (function() {

    var innerArr;

    var _compareObjects = function(obj1) {
        return (obj2) => {
            for (var key in obj2) {
                if (obj2[key] !== obj1[key])
                    return false;
            }
            return true;
        }
    }

    var asChain = function(arr) {
        innerArr = arr;
        return innerArr;
    }

    var awesomeEach = function(action) {
        for (let i = 0; i < innerArr.length; i++)
            action(innerArr[i], i, innerArr);
    }

    var awesomeMap = function(mapper) {
        const mapArr = [];
        for (let i = 0; i < innerArr.length; i++) {
            const result = mapper(innerArr[i], i);
            mapArr.push(result);
        }
        innerArr = mapArr;
        return innerArr;
    }

    var awesomeReduce = function(reducer) {
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

    var awesomeFind = function(predicateToFindFirstMatchingElement) {
        for (let i = 0; i < innerArr.length; i++) {
            const result = predicateToFindFirstMatchingElement(innerArr[i]);
            if (result)
                return innerArr[i];
        }
    }

    var awesomeFilter = function(filteringPredicate) {
        const filterArr = [];
        for (let i = 0; i < innerArr.length; i++) {
            const result = filteringPredicate(innerArr[i]);
            if (result)
                filterArr.push(innerArr[i]);
        }
        innerArr = filterArr;
        return innerArr;
    }

    var awesomeWhere = function(matchingObject) {
        const whereArr = [];
        for (let i = 0; i < innerArr.length; i++)
            if (_compareObjects(innerArr[i], matchingObject))
                whereArr.push(innerArr[i]);
        innerArr = whereArr;
        return innerArr;
    }

    var awesomeFirst = function() {
        return innerArr[0];
    }
        
    var awesomeLast = function() {
        return innerArr[innerArr.length - 1];
    }
        
    var awesomeMin = function() {
        return (selector) => {
            const selectArr = [];
            for (let i = 0; i < innerArr.length; i++) {
                if (innerArr[i][selector] != undefined)
                    selectArr.push(innerArr[i][selector]);
            }
            return Math.min(...selectArr);
        }
    }
        
    var awesomeMax = function() {
        return (selector) => {
            const selectArr = [];
            for (let i = 0; i < innerArr.length; i++) {
                if (innerArr[i][selector] != undefined)
                    selectArr.push(innerArr[i][selector]);
            }
            return Math.max(...selectArr);
        }
    }

    return {
        asChain: asChain,

        awesomeEach: awesomeEach,
        awesomeMap: awesomeMap,
        awesomeReduce: awesomeReduce,
        awesomeFind: awesomeFind,
        awesomeFilter: awesomeFilter,
        awesomeWhere: awesomeWhere,
        awesomeFirst: awesomeFirst,
        awesomeLast: awesomeLast,
        awesomeMin: awesomeMin,
        awesomeMax: awesomeMax
    }

})();