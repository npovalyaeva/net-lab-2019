var myAwesomeModule = (function() {

    var innerArr = [];

    var getValue = function() {
        return innerArr;
    }

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
        return this;
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
        return this;
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
        return this;
    }

    var awesomeWhere = function(matchingObject) {
        const whereArr = [];
        for (let i = 0; i < innerArr.length; i++)
            if (_compareObjects(innerArr[i], matchingObject))
                whereArr.push(innerArr[i]);
        innerArr = whereArr;
        return this;
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

    // ---------- ---------- ---------- Data types Functions ---------- ---------- ----------

    var isUndefined = function(value) {
        return typeof value === 'undefined';
    }
    
    var isNumber = function(value) {
        return typeof value === 'number' && isFinite(value) || value instanceof Number;
    }
    
    var isBoolean = function(value) {
        return typeof value === 'boolean'|| value instanceof Boolean;
    }
    
    var isString = function(value) {
        return typeof value === 'string' || value instanceof String;
    }
    
    var isObject = function(value) {
        return (typeof value === "object" || typeof value === 'function') && (value !== null);
    }
    
    var isNull = function(value) {
        return value === null;
    }
    
    var isFunction = function(value) {
        return value && {}.toString.call(value) === '[object Function]';
    }
    
    var isNan = function(value) {
        return value !== value || value != value;
    }

    // ---------- ---------- ---------- ---------- ---------- ---------- ----------

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
        awesomeMax: awesomeMax,

        isUndefined: isUndefined,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isString: isString,
        isObject: isObject,
        isNull: isNull,
        isFunction: isFunction,
        isNan: isNan,

        value: getValue
    }

})();