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

where(year); // 0: {title: "Lethal White", author: "Robert Galbraith", year: 2018, countOfPages: 760}
                  // 1: {year: 2018}
where(nextYear) // []

first(); // {name: "Puggy", height: 54, weight: 12}
last(); // {title: "The Casual Vacancy", author: " Joanne Rowling", year: 2015}

min('height'); // 54
min('year'); // 2015
min('title'); // NaN

max('height'); // 181
max('year'); // 2018
max('title'); // NaN

