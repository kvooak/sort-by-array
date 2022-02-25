# use-sort-by-array
Sort an array of objects by selected property value, using the values of another array.

# Examples

```js
import useSortByArray from 'use-sort-by-array';

const nameArray = [ 
  { name: 'Anne', order: 'a' },
  { name: 'Bob', order: 'b' },
  { name: 'Henry', order: 'b' },
  { name: 'Andrew', order: 'd' },
  { name: 'Jason', order: 'c' },
  { name: 'Thomas', order: 'b' },
]

const sortingArray = [ 'b', 'c', 'b', 'b', 'a', 'd' ]

const sortedNames = useSortByArray(nameArray, sortingArray, 'order');

// Output, sorted by the order of sortingArray:
// sortedNames = [    
//   { name: 'Bob'    , order: 'b' },
//   { name: 'Jason'  , order: 'c' },
//   { name: 'Henry'  , order: 'b' },
//   { name: 'Thomas' , order: 'b' },
//   { name: 'Anne'   , order: 'a' },
//   { name: 'Andrew' , order: 'd' },
// ]

```
