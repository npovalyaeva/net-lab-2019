Создать JS-библиотеку для реализации описанного функционала, для написания библиотеки использовать Module Pattern, предусмотреть однократное создание объекта-модуля и закрытое хранение его внутреннего состояния, к примеру, статистики вызовов, которую позже возможно получить с помощью публичных методов.
Для каждой функции библиотеки написать пример использования, допускается вывод в консоль браузера.
Весь код в процессе работы необходимо хранить в репозитории GitHub, периодически добавляя изменения в библиотеку в процессе разработки.

## Функции библиотеки:
### Общие функции
1. Функция, реализующая концепцию каррирования, возвращающая новую функцию с меньшим количеством параметров, созданную на основе переданной функции, подставляемого параметра (по умолчанию подставляется вместо последнего параметра), а также boolean-флага, указывающего на необходимость подстановки первого параметра вместо последнего.
2. Функция, производящая мемоизирующую версию функции на основе переданной ей функции, предусмотреть возможность мемоизации различных типов функции с различными передаваемыми параметрами.

### Функции работы с массивами
- `void each(arr, func action)`
- `arr map(arr, func mapper)`
- `obj reduce(arr, func reduceFuncWithAccumulatorParameter)`
- `obj find(arr, func predicateToFindFirstMatchingElement)`
- `arr filter(arr, func filteringPredicate)`
- `arr where(arr, obj matchingObject)`
- `obj first(arr)`
- `obj last(arr)`
- `number min(arr, func selector)`
- `number max(arr, func selector)`

Реализовать возможность построения цепочек вызова функций на массиве, иными словами - chaining.
К примеру: `asChain(arr).where(func).map(func).reduce(func)`

### Функции для определения типов данных соответственно специфике языка
- `bool isUndefined(obj)`
- `bool isNumber(obj)`
- `bool isBoolean(obj)`
- `bool isString(obj)`
- `bool isObject(obj)`
- `bool isNull(obj)`
- `bool isFunction(obj)`
- `bool isNaN(obj)`

***

Изучить технику прототипного наследования и наследования с использованием функции-конструктора и создать следующие классы, используя обе техники:

### User:
+ `firstName`
+ `lastName`

+ `sayHi()`

### Pupil <- User:
+ `marks[]`
+ `isAnswerForLastQuestionKnown`

+ `answerQuestion()`

### Teacher <- User:
+ `lastSetMark`

+ `askQuestion(Pupil)`
+ `setMark(Pupil)`

Учитель может задать вопрос ученику и, в зависимости от того, знает ли тот ответ, поставить ученику отметку.