var myAwesomeModule = (function() {

    var innerArr;

    var compareObjects = function(obj1) {
        return (obj2) => {
            for (var key in obj2) {
                if (obj2[key] !== obj1[key])
                    return false;
            }
            return true;
        }
    }

    asChain = function(arr) {
        innerArr = arr;
        return innerArr;
    }

    Array.prototype.awesomeEach = function(action) {
        for (let i = 0; i < this.length; i++)
            action(this[i], i, this);
    }

    Array.prototype.awesomeMap = function(mapper) {
        const mapArr = [];
        for (let i = 0; i < this.length; i++) {
            const result = mapper(this[i], i);
            mapArr.push(result);
        }
        return mapArr;
    }

    Array.prototype.awesomeReduce = function(reducer) {
        return (initialValue) => {
            let accumulator = (initialValue === undefined) ? undefined : initialValue;
            for (let i = 0; i < this.length; i++)        
                if (accumulator !== undefined)
                    accumulator = reducer.call(undefined, accumulator, this[i], i, this);
                else
                    accumulator = this[i];
            return accumulator; 
        } 
    }

    Array.prototype.awesomeFind = function(predicateToFindFirstMatchingElement) {
        for (let i = 0; i < this.length; i++) {
            const result = predicateToFindFirstMatchingElement(this[i]);
            if (result)
                return this[i];
        }
    }

    Array.prototype.awesomeFilter = function(filteringPredicate) {
        const filterArr = [];
        for (let i = 0; i < this.length; i++) {
            const result = filteringPredicate(this[i]);
            if (result)
                filterArr.push(this[i]);
        }
        return filterArr;
    }

    Array.prototype.awesomeWhere = function(matchingObject) {
        const whereArr = [];
        for (let i = 0; i < this.length; i++)
            if (compareObjects(this[i], matchingObject))
                whereArr.push(this[i]);
        return whereArr;
    }

    Array.prototype.awesomeFirst = function() {
        return this[0];
    }
        
    Array.prototype.awesomeLast = function() {
        return this[this.length - 1];
    }
        
    Array.prototype.awesomeMin = function() {
        return (selector) => {
            const selectArr = [];
            for (let i = 0; i < this.length; i++) {
                if (this[i][selector] != undefined)
                    selectArr.push(this[i][selector]);
            }
            return Math.min(...selectArr);
        }
    }
        
    Array.prototype.awesomeMax = function() {
        return (selector) => {
            const selectArr = [];
            for (let i = 0; i < this.length; i++) {
                if (this[i][selector] != undefined)
                    selectArr.push(this[i][selector]);
            }
            return selectArr;
            //return Math.max(...selectArr);
        }
    }

    return {
        asChain: asChain,

        each: Array.prototype.awesomeEach(),
        map: Array.prototype.awesomeMap(),
        reduce: Array.prototype.awesomeReduce(),
        find: Array.prototype.awesomeFind(),
        filter: Array.prototype.awesomeFilter(),
        where: Array.prototype.awesomeWhere(),
        first: Array.prototype.awesomeFirst(),
        last: Array.prototype.awesomeLast(),
        min: Array.prototype.awesomeMin(),
        max: Array.prototype.awesomeMax(),
    }

})();