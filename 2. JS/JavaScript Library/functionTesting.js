var dog = {
    name: "Puggy",
    height: 54,
    weight: 12
};

var girl = {
    name: "Helen",
    height: 166,
    weight: 54
};

var boy = {
    name: "Erlie",
    height: 181,
    weight: 87
};

var newBook = {
    title: "Lethal White",
    author: "Robert Galbraith",
    year: 2018,
    countOfPages: 760
};

var unknownBook = {
    year: 2018
};

var book = {
    title: "The Casual Vacancy",
    author: " Joanne Rowling",
    year: 2015
};

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

const words = ["spray", "limit", "elite", "exuberant", "destruction", "present", "happy"];

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
      if (element % start++ < 1) {
        return false;
      }
    }
    return element > 1;
}

const numbers = [4, 5, 7, 8, 11, 12, 13];
const copyNumbers = [];

// ---------- ---------- ----------

console.log(copyNumbers); // []
myAwesomeModule.asChain(numbers).each(function(number) {
    copyNumbers.push(number)
});
console.log(copyNumbers); // [4, 5, 7, 8, 11, 12, 13]

// ---------- ---------- ----------

const arrToReduce = myAwesomeModule.asChain(numbers).reduce(function(sum, current) {
    return sum + current;
});

arrToReduce(); // 60
arrToReduce(7); // 67

// ---------- ---------- ----------

myAwesomeModule.asChain(numbers).first(); // 4
myAwesomeModule.asChain(numbers).last(); // 13

myAwesomeModule.asChain([4, 6, 8, 12]).find(isPrime); // undefined
myAwesomeModule.asChain(numbers).find(isPrime); // 5

myAwesomeModule.asChain([4, 6, 8, 12]).filter(number => number.isPrime); // []
myAwesomeModule.asChain(numbers).filter(number => number > 6); // [7, 8, 11, 12, 13]
myAwesomeModule.asChain(numbers).filter(number => number > 6).map(Math.sqrt); // [2.6457513110645907, 2.8284271247461903, 3.3166247903554, 3.4641016151377544, 3.605551275463989]
myAwesomeModule.asChain(numbers).filter(number => number > 6).map(Math.sqrt).first(); // 2.6457513110645907
myAwesomeModule.asChain(numbers).filter(number => number > 6).map(Math.sqrt).last(); // 3.605551275463989

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

const numbers = [6, 3, 1, 8, 5, 7, 2, 9];

myAwesomeModule.asChain(numbers).first(); // 6
myAwesomeModule.asChain(numbers).last(); // 9
myAwesomeModule.asChain(numbers).map(Math.sqrt); // [2.449489742783178, 1.7320508075688772, 1, 2.8284271247461903, 2.23606797749979, 2.6457513110645907, 1.4142135623730951, 3]
myAwesomeModule.asChain(numbers).map(Math.sqrt).first(); // 2.449489742783178

// ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------

const arr = [dog, girl, boy, newBook, unknownBook, book];

const year = {
    year: 2018
}

const nextYear = {
    year: 2020
}

myAwesomeModule.asChain(arr).where(year); // 0: {title: "Lethal White", author: "Robert Galbraith", year: 2018, countOfPages: 760} 1: {year: 2018}
myAwesomeModule.asChain(arr).where(nextYear); // []

arr.first(); // {name: "Puggy", height: 54, weight: 12}
arr.last(); // {title: "The Casual Vacancy", author: " Joanne Rowling", year: 2015}

arr.min('height'); // 54
arr.min('year'); // 2015
arr.min('title'); // NaN

arr.max('height'); // 181
arr.max('year'); // 2018
arr.max('title'); // NaN