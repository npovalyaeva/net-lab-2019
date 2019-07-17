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

var arr = [dog, girl, boy, newBook, unknownBook, book];

// ---------- ---------- ---------- ---------- ---------- ---------- ----------

var year = {
    year: 2018
}

var nextYear = {
    year: 2020
}

arr.where(year); // 0: {title: "Lethal White", author: "Robert Galbraith", year: 2018, countOfPages: 760}
             // 1: {year: 2018}
arr.where(nextYear); // []

compareObjects(newBook)(book); // false
compareObjects(newBook)(unknownBook); // true
compareObjects(unknownBook)(newBook) // false

arr.first(); // {name: "Puggy", height: 54, weight: 12}
arr.last(); // {title: "The Casual Vacancy", author: " Joanne Rowling", year: 2015}

arr.min('height'); // 54
arr.min('year'); // 2015
arr.min('title'); // NaN

arr.max('height'); // 181
arr.max('year'); // 2018
arr.max('title'); // NaN