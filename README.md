# sort-by-array

Sort an array of objects or sub-arrays using a reference list.

Examples and documentation: https://kvooak.io

# Quick example:

```js
import sortByArray from 'sort-by-array';

const nameArray = [
  { name: 'Anne', order: { this: 'a' } },
  { name: 'Bob', order: { this: 'b' } },
  { name: 'Henry', order: { this: 'b' } },
  { name: 'Andrew', order: { this: 'd' } },
  { name: 'Jason', order: { this: 'c' } },
  { name: 'Thomas', order: { this: 'e' } },
  { name: 'Peter', order: { this: 'e' } },
];

const sortedObjectBy = ['b', 'e', 'e', 'b', 'a', 'd', 'c'];
const sortedNames = sortByArray(
  nameArray,
  sortingArray,
  'order.this',
  'exact',
);

const nestedArray = [
  ['Anne', '1'],
  ['Chris', '4'],
  ['Vero', '3'],
  ['Luca', 2],
  ['Masha', 2],
  ['Kosta', 2],
  ['Quang', 5],
];

const sortNestedBy = [5, '1', 2, '3', '4'];
const sortedArrays = sortByArray(nestedArray, sortNestedBy, 1);
```

### Contact me at me@kvooak.io
